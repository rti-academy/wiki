import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { Article } from '@app/models/article';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

}
