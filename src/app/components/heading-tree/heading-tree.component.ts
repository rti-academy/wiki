import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { ArticlesTree } from '@app/models/articles-tree';

@Component({
  selector: 'app-heading-tree',
  templateUrl: './heading-tree.component.html',
  styleUrls: ['./heading-tree.component.css']
})
export class HeadingTreeComponent implements OnInit {
  public articleTree: ArticlesTree;
  constructor(private articleService: ArticleService) {
    this.articleTree = new ArticlesTree(articleService.getAll());
  }

  ngOnInit() {
  }

}
