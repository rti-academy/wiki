import { Component, OnInit } from '@angular/core';
import { ArticleService, AddParams } from '@app/services/article.service';
import { Article } from '@app/models/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  private id: number;
  private title: string;
  private content: string;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const article = this.articleService.articles[+params.get('id') - 1];
      this.id = article.id;
      this.title = article.title;
      this.content = article.content;
    });
  }

  private saveChange() {
    this.articleService.edit(
      this.id, {
        title: this.title,
        content: this.content
      });
  };

}
