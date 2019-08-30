import { Injectable, EventEmitter } from '@angular/core';
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
  allNodes: TreeNode[] = [];
  rerenderTree: EventEmitter<any> = new EventEmitter();

  constructor(
    private rubricService: RubricService,
    private router: Router,
  ) { 
    this.rerenderTree.subscribe(event => {
      console.log(event);
      this.loadTree();
    })
  }

  public getTreeControl(): NestedTreeControl<TreeNode> {
    return this.treeControl;
  }

  public getDataSource(): MatTreeNestedDataSource<TreeNode> {
    return this.dataSource;
  }

  public loadTree(): void {
    let rootNodes: TreeNode[] = [];
    this.rubricService.getAll().subscribe((response: any) => {
      this.allNodes = response.articles;
      rootNodes = this.allNodes.filter(node => node.parentId === 0);
      rootNodes.forEach(rootNode => {
        rootNode.children = this.getChildren(this.allNodes, rootNode.id);
      });
      this.dataSource.data = rootNodes;
      this.expandActive();
    });
  }

  public activeNodeSubscribe(): void {
    this.treeControl.collapseAll();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.id = this.getIdFromUrl();
        this.expandActive();
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

  private expandActive(): void {
    const activeArticle = this.allNodes.find(node => node.id === this.id);
    if (activeArticle) {
      const treeNodesForExpand = this.getTreeNodesForExpand(activeArticle);
      this.expandTreeNodes(treeNodesForExpand);
    }
  }

  private getTreeNodesForExpand(node: TreeNode): TreeNode[] {
    const treeNodesForExpand: TreeNode[] = [];
    let treeNode: TreeNode;
    let id = node.parentId;
    while (id) {
      treeNode = this.getTreeNodeById(id);
      treeNodesForExpand.push(treeNode);
      id = treeNode.parentId;
    }
    return treeNodesForExpand;
  }

  private getTreeNodeById(id: number): TreeNode {
    return this.allNodes.find(treeNode => treeNode.id === id);
  }

  private expandTreeNodes(treeNodesForExpand: TreeNode[]): void {
    treeNodesForExpand.forEach(treeNode => this.treeControl.expand(treeNode));
  }
}