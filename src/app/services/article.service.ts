import { Article } from '../models/article';
import { EventEmitter } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface AddParams {
  title: string;
  content: string;
  parentId: number;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Корневой раздел',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 0,
    tags: [1, 2],
  },
  {
    id: 2,
    title: 'Подраздел 1',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1,
    tags: [],
  },
  {
    id: 3,
    title: 'Подраздел 2',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1,
    tags: [],
  },
  {
    id: 4,
    title: 'Подраздел 3',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 1,
    tags: [],
  },
  {
    id: 5,
    title: 'Подраздел 1.1',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 2,
    tags: [],
  },
  {
    id: 6,
    title: 'Подраздел 1.2',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 2,
    tags: [],
  },
  {
    id: 7,
    title: 'Подраздел 1.1.1',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 5,
    tags: [],
  },
  {
    id: 8,
    title: 'Подраздел 1.1.2',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: `Подзаголовок 1
    Много текста, который описывает что-то важное
    Подзаголовок 1.1
    Много текста, который описывает что-то важное
    Подзаголовок 1.2
    Много текста, который описывает что-то важное
    Подзаголовок 2
    Много текста, который описывает что-то важное`,
    parentId: 5,
    tags: [],
  },
];

export class ArticleService {
  private counter = 8;
  public articles: Article[] = mockArticles;
  public update: EventEmitter<any> = new EventEmitter();

  public add({ title, content, parentId }: AddParams): void {
    const id = ++this.counter;
    const creationTime = new Date();
    const updateTime = creationTime;
    const version = 1;
    const tags: number[] = [];
    this.articles.push({ id, title, content, parentId, creationTime, updateTime, version, tags });
    this.update.emit();
  }

  public edit(id: number, params: Partial<AddParams>): void {
    this.articles.forEach((article, index) => {
      if (article.id === id) {
        const version = article.version + 1;
        const updateTime = new Date();
        this.articles[index] = { ...article, ...params, version, updateTime };
      }
    });
    this.update.emit();
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
    this.update.emit();
  }

  public search(title): Article[] {
    return this.articles.filter(article => {
      return article.title.includes(title);
    });
  }

  public deleteTagFromArticle(articleId, tagId) {
    const article = this.get(articleId);
    const tagIndex = article.tags.findIndex(t => t === tagId);
    article.tags.splice(tagIndex, 1);
  }

  public addTagToArticle(articleId: number, tagId: number) {
    const article = this.get(articleId);
    article.tags.push(tagId);
  }
}
