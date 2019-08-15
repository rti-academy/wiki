import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { Article } from '@app/models/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  private article: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.article = this.articleService.articles[+params.get('id') - 1];
    });
  }

  private saveChange() {
    this.articleService.edit(this.article.id, this.article);
  };

}
