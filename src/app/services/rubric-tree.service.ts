import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { filter } from 'rxjs/operators';
import { TreeNode } from '@app/models/tree-node';
import { RubricService } from '@app/services/rubric.service';

@Injectable({
  providedIn: 'root'
})
export class RubricTreeService {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  id: number;
  rootNode: TreeNode;

  constructor(
    private rubricService: RubricService,
    private router: Router,
  ) { }

  public getTreeControl(): NestedTreeControl<TreeNode> {
    return this.treeControl;
  }

  public getDataSource(): MatTreeNestedDataSource<TreeNode> {
    return this.dataSource;
  }

  public loadTree(): void {
    let rootNodes: TreeNode[] = [];
    this.rubricService.getAll().subscribe((response: any) => {
      rootNodes = response.articles.filter(article => article.parentId === 0);
      rootNodes.forEach(rootNode => {
        rootNode.children = this.getChildren(response.articles, rootNode.id);
      });
      this.dataSource.data = rootNodes;
      this.expand();
    });
  }

  public activeNodeSubscribe(): void {
    this.treeControl.collapseAll();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.id = this.getIdFromUrl();
        this.expand();
      });
  }

  private getChildren(treeNodes: TreeNode[], parentId: number): TreeNode[] {
    const childNodes = treeNodes.filter(node => node.parentId === parentId)
      .sort(childNode => childNode.type === 'rubric' ? -1 : 1);

    childNodes.forEach(childNode => {
      childNode.children = this.getChildren(treeNodes, childNode.id);
    });
    return childNodes;
  }

  private getIdFromUrl(): number {
    const parts = location.pathname.split('/');
    return parts.length > 2 ? Number(parts[2]) : null;
  }

  private expand(): void {
    for (const rootNode of this.dataSource.data) {
      this.rootNode = rootNode;
      this.expandActive(rootNode);
    }
  }

  private expandActive(node: TreeNode) {
    const activeArticle = node.children.find(childNode => childNode.id === this.id);
    if (activeArticle) {
      const treeNodesForExpand = this.getTreeNodesForExpand(activeArticle);
      this.expandTreeNodes(treeNodesForExpand);
    } else {
      for (const child of node.children) {
        this.expandActive(child);
      }
    }
  }

  private getTreeNodesForExpand(node: TreeNode): TreeNode[] {
    const treeNodesForExpand: TreeNode[] = [];
    let treeNode: TreeNode;
    let id = node.parentId;

    const descendants = this.treeControl.getDescendants(this.rootNode);
    descendants.push(this.rootNode);

    do {
      treeNode = this.getTreeNodeByIdFromDescendants(id, descendants);
      treeNodesForExpand.push(treeNode);
      id = treeNode.parentId;
    } while (id);
    return treeNodesForExpand;
  }

  private getTreeNodeByIdFromDescendants(id: number, descendants: TreeNode[]): TreeNode {
    return descendants.find(treeNode => treeNode.id === id);
  }

  private expandTreeNodes(treeNodesForExpand: TreeNode[]): void {
    treeNodesForExpand.forEach(treeNode => this.treeControl.expand(treeNode));
  }
}