import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ArticleService } from '@app/services/article.service';
import { SetRubricDialogComponent } from '../set-rubric-dialog/set-rubric-dialog.component';

@Component({
  selector: 'app-article-menu',
  templateUrl: './article-menu.component.html',
  styleUrls: ['./article-menu.component.css']
})
export class ArticleMenuComponent {

  @Input()
  public articleId: number;

  @Input()
  public menuIcon = 'more_vert';

  @Output()
  public menuOpened = new EventEmitter();

  @Output()
  public menuClosed = new EventEmitter();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private articleService: ArticleService,
  ) {
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {width: '400px',
       data: 'статью'
    },
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleService.delete(this.articleId)
          .subscribe(() => {
            this.router.navigate([``])
              .then(() => {
                window.location.reload(); // Временный костыль
              });
          });
      }
    });
  }

  public openSetRubricDialog(): void {
    const dialogRef = this.dialog.open(
      SetRubricDialogComponent,
      {
        width: '400px',
        data: {
          includedNodeParentIDs: [],
          excludedNodeParentIDs: [0],
        }
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.articleService.edit(
          this.articleId,
          {parentId: result}
        ).subscribe(() => {
          window.location.reload(); // Временный костыль
        });
      }
    });
  }

}
