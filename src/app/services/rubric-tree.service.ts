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
  articles: TreeNode[] = [];
  id: number;

  constructor(
    private rubricService: RubricService,
    private router: Router,
  ) { }

  public getTreeControl() {
    return this.treeControl;
  }

  public getDataSource() {
    return this.dataSource;
  }

  public loadTree() {
    let rootNodes: TreeNode[] = [];
    this.rubricService.getAll().subscribe((response: any) => {

      this.articles = response.articles;
      rootNodes = response.articles.filter(rootNode => rootNode.parentId === 0);
      rootNodes.forEach(rootNode => {
        rootNode.children = this.getChildren(response.articles, rootNode.id);
      });
      this.dataSource.data = rootNodes;
      this.expand();

    });
  }

  private getChildren(articles: TreeNode[], parentId: number): TreeNode[] {
    const nodes = articles.filter(node => node.parentId === parentId)
      .sort(c => {
        return c.type === 'rubric' ? -1 : 1;
      });
    nodes.forEach(node => {
      node.children = this.getChildren(articles, node.id);
    });
    return nodes;
  }

  public activeNodeSubscribe() {
    this.treeControl.collapseAll();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.id = this.getIdFromUrl();
        this.expand();
      });
  }

  private expand() {
    // this.treeControl.collapseAll()
    for (const node of this.dataSource.data) {
      const result = this.expandActive(node);
      if (result) {
        this.treeControl.expand(node);
        break;
      }
    }
  }

  private expandActive(node: TreeNode) {
    if (node.children.filter(childNode => childNode.id === this.id).length !== 0) {
      this.treeControl.expand(node);
      return true;
    } else {
      for (const child of node.children) {
        if (this.expandActive(child)) {
          return true;
        }
      }
      return false;
    }
  }

  getIdFromUrl(): number {
    const parts = location.pathname.split('/');
    return parts.length > 2 ? Number(parts[2]) : null;
  }
}
