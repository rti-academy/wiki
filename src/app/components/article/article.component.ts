import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { Article } from '@app/models/article';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SetRubricDialogComponent } from '../set-rubric-dialog/set-rubric-dialog.component';
import { ArticleStatusService } from '@app/services/article-status.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public article: Article;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private articleStatusService: ArticleStatusService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.articleService.getById(id)
          .subscribe((response: any) => {
            this.article = response.article;
            this.article.updateTime = new Date(this.article.updateTime);
            this.article.status = this.articleStatusService.getView(this.article.status);
        });
      }
    });
  }

  // public openDeleteDialog(): void {
  //   const dialogRef = this.dialog.open(
  //     DeleteDialogComponent,
  //     {width: '400px',
  //      data: 'статью'
  //   },
  //   );

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.articleService.delete(this.article.id)
  //         .subscribe(() => {
  //           this.router.navigate([``])
  //             .then(() => {
  //               window.location.reload(); // Временный костыль
  //             });
  //         });
  //     }
  //   });
  // }

  // public openSetRubricDialog(): void {
  //   const dialogRef = this.dialog.open(
  //     SetRubricDialogComponent,
  //   );

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.articleService.edit(
  //         this.article.id,
  //         {parentId: result}
  //       ).subscribe(() => {
  //         window.location.reload(); // Временный костыль
  //       });
  //     }
  //   });
  // }

}
