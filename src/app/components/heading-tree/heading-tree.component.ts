import { Component, OnInit, Testability } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticlesTree, ArticleTreeNode } from '../../models/articles-tree';
import { Article } from '../../models/article';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-heading-tree',
  templateUrl: './heading-tree.component.html',
  styleUrls: ['./heading-tree.component.css']
})
export class HeadingTreeComponent implements OnInit {
  public articleTree: ArticlesTree;
  public articles: Article[];
  
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleTree = new ArticlesTree(this.articleService.getAll());
    this.articleService.update.subscribe(
      () => this.articleTree = new ArticlesTree(this.articleService.getAll())
    );
  }

}
