import { Injectable } from "@angular/core";
import { Article } from "../models/article";

interface AddParams {
  title: string;
  content: string;
  parentId: number;
}

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  private counter = 0;
  public articles: Article[] = mock_articles;

  public add({ title, content, parentId }: AddParams): void {
    const id = ++this.counter;
    const creationTime = new Date();
    const version = 1;
    this.articles.push({ id, title, content, parentId, creationTime, version });
  }

  public edit(id: number, { title, content }: AddParams): void {
    this.articles.forEach(article => {
      if (article.id === id) {
        article.title = title;
        article.content = content;
      }
    });
  }

  public get(id: number): Article {
    return this.articles.find(article => article.id === id);
  }

  public delete(id: number): void {
    this.articles.forEach((article, index) => {
      if (article.id === id) {
        this.articles.splice(index, 1);
      }
    });
  }

  public search(title): Article[] {
    return this.articles.filter(article => {
      return article.title.includes(title);
    });
  }
}

const mock_articles: Article[] = [
  {
    id: 1,
    title: "Заголовок_1",
    creationTime: new Date("2019-08-13"),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1
  },
  {
    id: 2,
    title: "Заголовок_2",
    creationTime: new Date("2019-08-13"),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1
  },
  {
    id: 3,
    title: "Заголовок_3",
    creationTime: new Date("2019-08-13"),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1
  }
];
