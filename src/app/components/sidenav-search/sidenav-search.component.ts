import { Component, OnInit } from '@angular/core';
import { Article } from '@app/models/article';
import { Router } from '@angular/router';

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

  ngOnInit() {
  }

  public handleSelect(article: Article) {
    this.router.navigate(['articles', article.id]);
  }

}
