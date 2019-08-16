import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { Article } from '@app/models/article';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  private article: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.articleService.getById(+params.get('id'))
        .subscribe((response: any) => {
          this.article = response.article;
          this.article.updateTime = new Date(this.article.updateTime);
        });
    });
  }

  private openDeleteDialog(): void {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {width: '400px'},
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleService.delete(this.article.id)
          .subscribe(() => {
            this.router.navigate([``])
              .then(() => {
                window.location.reload(); // Временный костыль
              });
          });
      }
    });
  }

}
