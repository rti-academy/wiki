import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '@app/services/article.service';
import { DialogService } from '@app/services/dialog.service';
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
    private articleService: ArticleService,
    private dialogService: DialogService,
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  public openDeleteDialog(): void {
    this.dialogService.openDeleteDialog({title: 'Вы уверены, что хотите удалить статью?'})
    .subscribe(result => {
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
    this.dialogService.openSetRubricDialog({
            includedNodeParentIDs: [],
            excludedNodeParentIDs: [0],
          })
          .subscribe((result) => {
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
