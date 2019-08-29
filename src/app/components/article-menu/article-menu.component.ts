import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ArticleService } from '@app/services/article.service';
import { SetRubricDialogComponent } from '../set-rubric-dialog/set-rubric-dialog.component';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

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

  public isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  public isSmall: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private articleService: ArticleService,
    private breakpointObserver: BreakpointObserver,
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
