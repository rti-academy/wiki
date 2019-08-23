import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { RubricService } from '@app/services/rubric.service';
import { ArticleService } from '@app/services/article.service';
import { filter } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { Router, NavigationEnd } from '@angular/router';
import { Rubric } from '@app/models/rubric';
import { Article } from '@app/models/article';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddRubricDialogComponent } from '@app/components/rubric/add-rubric-dialog/add-rubric-dialog.component';
interface TreeNode {
  id: number;
  title: string;
  children ?: TreeNode[];
  type ?: string;
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
  articles: Article[] = [];

  constructor(private rubricService: RubricService,
              private articleService: ArticleService,
              private router: Router,
              public dialog: MatDialog, ) { }

  ngOnInit() {
    this.loadTree();
    this.activeNodeSubscribe();

  }

  private loadTree() {
    const rubrics = this.rubricService.getAll();
    const articles = this.articleService.getAll();
    forkJoin([rubrics, articles]).subscribe(this.observer);
  }
  private observer = (response) => {
    this.treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<TreeNode>();
    this.rubrics = response[0].articles;
    this.articles = response[1].articles;
    this.rubrics.forEach(rubric => {
      this.dataSource.data.push({
        id: rubric.id,
        title: rubric.title,
        children: this.getChildren(this.articles, rubric.id),
        type: 'rubric',
      });
    });
    this.expandActive();
  }


  private getChildren(articles: Article[], rubricId: number): Article[] {
    return articles.filter(article => article.parentId === rubricId);
  }

  private activeNodeSubscribe() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.id = this.getIdFromUrl();
        this.expandActive();
      });
  }
  private expandActive() {
    this.dataSource.data.forEach(node => {
      if (node.children.filter(childNode => childNode.id === this.id).length !== 0) {
        this.treeControl.expand(node);
      }
    }
    );
  }

  getIdFromUrl(): number {
    const parts = location.pathname.split('/');
    return parts.length > 2 ? Number(parts[2]) : null;
  }
  public openDeleteDialog(node): void {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        width: '400px',
        data: 'рубрику и все входящие в нее статьи'
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const articlesToDelete: Article[] = this.getChildren(this.articles, node.id);
        console.log(articlesToDelete);
        let deleteRequests: any[]=[];
        articlesToDelete.forEach(article => {
          deleteRequests.push(this.articleService.delete(article.id));
        });
        deleteRequests.push(this.articleService.delete(node.id));
        forkJoin(deleteRequests)
          .subscribe(() => {
            this.router.navigate([``])
              .then(() => {
                window.location.reload(); // Временный костыль
              });
          });
      }
    });
  }

  public openAddRubricDialog(node): void {
    const dialogRef = this.dialog.open(
      AddRubricDialogComponent,
      {
        width: '400px',
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rubricService.addRubric(result)
          .subscribe((response) => {
            this.loadTree();
           });
      }
    });
  }


  isRubric = (_: number, node: TreeNode) => node.type === 'rubric';
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}
