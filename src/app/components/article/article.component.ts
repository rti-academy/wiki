import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { Article } from '../../models/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  private article: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.articleService.getById(+params.get('id'))
        .subscribe((response: any) => {
          this.article = response.article;
          this.article.creationTime = new Date(this.article.creationTime);
          this.article.updateTime = this.article.creationTime;
        });
    });
  }

}
