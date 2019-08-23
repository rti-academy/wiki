import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '@app/models/article';
import { Router } from '@angular/router';
import { ArticleSearchComponent } from '../article-search/article-search.component';

@Component({
  selector: 'app-sidenav-search',
  templateUrl: './sidenav-search.component.html',
  styleUrls: ['./sidenav-search.component.css']
})
export class SidenavSearchComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  @ViewChild('search', { static: false })
  public search: ArticleSearchComponent;

  ngOnInit() {
  }

  public handleSelect(article: Article) {
    this.router.navigate(['articles', article.id]);
    this.search.reset();
  }

}
