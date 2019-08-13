import { Component, OnInit } from "@angular/core";
import { Article } from "../../models/article";

const mock_article = {
  id: 2,
  title: "Заголовок",
  creationTime: new Date("2019-08-13"),
  version: 1,
  content: "Какой-то контент",
  parentId: 1
};

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  article: Article = mock_article;
  creationTime: string = this.dateFormat(mock_article.creationTime);

  constructor() {}

  ngOnInit() {}

  dateFormat(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    let newMonth;
    if (month.toString.length == 1) {
      newMonth = `0${month}`;
    }
    return `${day}.${newMonth}.${year}`;
  }
}
