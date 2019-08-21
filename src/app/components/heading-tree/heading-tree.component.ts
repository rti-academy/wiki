import { Component, OnInit, Testability } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { ArticlesTree } from '@app/models/articles-tree';
import { Article } from '@app/models/article';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-heading-tree',
  templateUrl: './heading-tree.component.html',
  styleUrls: ['./heading-tree.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class HeadingTreeComponent implements OnInit {
  public articleTree: ArticlesTree;
  public articles: Article[];

  public id: number;


  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    // this.articleTree = new ArticlesTree(this.articleService.getAll());
    // this.articleService.update.subscribe(
    //   () => this.articleTree = new ArticlesTree(this.articleService.getAll())
    // );
    // this.id = this.getIdFromUrl()
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {this.id = this.getIdFromUrl();
    //     console.log(this.id);});
      
  }

  getIdFromUrl(): number {
    const parts = location.pathname.split('/');
    return parts.length > 2 ? Number(parts[2]) : null;
  }

}
