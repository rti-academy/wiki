import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { RubricService } from '@app/services/rubric.service';
import { ArticleService } from '@app/services/article.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Rubric } from '@app/models/rubric';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddRubricDialogComponent } from '@app/components/rubric/add-rubric-dialog/add-rubric-dialog.component';
import { UpdateRubricDialogComponent } from '@app/components/rubric/update-rubric-dialog/update-rubric-dialog.component';
import { DeleteRubricDialogComponent } from './delete-rubric-dialog/delete-rubric-dialog.component';
import { SetRubricDialogComponent } from '../set-rubric-dialog/set-rubric-dialog.component';


interface TreeNode {
  id: number;
  title: string;
  parentId: number;
  children?: TreeNode[];
  type?: string;
}

@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.css']
})

export class RubricComponent implements OnInit {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  id: number;
  rubrics: Rubric[] = [];
  articles: TreeNode[] = [];
  buttonVisible = false;

  constructor(
    private rubricService: RubricService,
    private articleService: ArticleService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadTree();
    this.activeNodeSubscribe();
  }
  private loadTree() {
    let rootNodes: TreeNode[] = [];
    this.rubricService.getAll().subscribe((response: any) => {

      this.treeControl = new NestedTreeControl<TreeNode>(node => node.children);
      this.dataSource = new MatTreeNestedDataSource<TreeNode>();
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


  private activeNodeSubscribe() {
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

  public openDeleteDialog(node: TreeNode): void {
    const nodesToDelete = this.convertNodeTreeToList(node);
    const rubricTitle = node.title;

    const dialogRef = this.dialog.open(
      DeleteRubricDialogComponent,
      {
        width: '400px',
        data: {
          rubricTitle,
          nodesToDelete,
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteRequests = nodesToDelete
          .map(n => this.articleService.delete(n.id));

        forkJoin(deleteRequests)
          .subscribe(() => {
            window.location.replace('/'); // Временный костыль
          });
      }
    });
  }

  public openSetRubricDialog(node: TreeNode): void {
    const dialogRef = this.dialog.open(
      SetRubricDialogComponent,
      {
        width: '400px',
        data: {
          includedNodeParentIDs: [0],
          excludedNodeParentIDs: [],
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        node.parentId = result;
        this.rubricService.updateRubric(node).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  public openAddRubricDialog(parentId: number): void {
    const dialogRef = this.dialog.open(
      AddRubricDialogComponent,
      {
        width: '400px',
      },
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rubricService.addRubric(result, parentId)
          .subscribe(() => {
            window.location.reload(); // Временный костыль
          });
      }
    });
  }

  public openUpdateRubricDialog(node: Rubric): void {
    const dialogRef = this.dialog.open(
      UpdateRubricDialogComponent,
      {
        width: '400px',
        data: node.title,
      },
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rubricService.updateRubric({ id: node.id, title: result, parentId: node.parentId })
          .subscribe((response) => {
            window.location.reload(); // Временный костыль
          });
      }
    });
  }

  isRubric = (_: number, node: TreeNode) => node.type === 'rubric';
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  private convertNodeTreeToList(node: TreeNode, initial: TreeNode[] = []) {
    initial.push(node);

    for (const childNode of node.children) {
      this.convertNodeTreeToList(childNode, initial);
    }

    return initial;
  }
}
