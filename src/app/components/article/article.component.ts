import { Component, OnInit } from "@angular/core";
import { ArticleService } from "@app/services/article.service";
import { Article } from "../../models/article";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  article: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.article = this.articleService.articles[+params.get("id") - 1];
    });
  }
}
