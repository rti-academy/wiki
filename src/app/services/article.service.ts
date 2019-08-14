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
  private articles: Article[] = this.getMockArticles();

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

  public getAll(): Article[] {
    return this.articles;
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

  private getMockArticles(): Article[] {
    return [
      {
          id: 1,
          parentId: 0,
          creationTime: new Date(),
          title: 'Корневой раздел',
          content: '',
          version: 0
      },
      {
          id: 2,
          parentId: 1,
          creationTime: new Date(),
          title: 'Подраздел 1',
          content: '',
          version: 0
      },
      {
          id: 3,
          parentId: 1,
          creationTime: new Date(),
          title: 'Подраздел 2',
          content: '',
          version: 0
      },
      {
          id: 4,
          parentId: 1,
          creationTime: new Date(),
          title: 'Подраздел 3',
          content: '',
          version: 0
      },
      {
          id: 5,
          parentId: 2,
          creationTime: new Date(),
          title: 'Подраздел 1.1',
          content: '',
          version: 0
      },
      {
          id: 6,
          parentId: 2,
          creationTime: new Date(),
          title: 'Подраздел 1.2',
          content: '',
          version: 0
      },
      {
          id: 7,
          parentId: 5,
          creationTime: new Date(),
          title: 'Подраздел 1.1.1',
          content: '',
          version: 0
      },
      {
          id: 8,
          parentId: 5,
          creationTime: new Date(),
          title: 'Подраздел 1.1.2',
          content: '',
          version: 0
      },
    ];
  }
}
