import { Article } from '../models/article';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tag } from '@app/models/tag';
import { TagService } from './tag.service';

export interface AddParams {
  title: string;
  content: string;
  parentId: number;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: '78.01.01 Руководящие материалы',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 1,
    tags: [1, 2],
  },
  {
    id: 2,
    title: '78.01.13 Научные и технические общества, съезды, конгрессы, конференции, симпозиумы, семинары, выставки в военной области',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 1,
    tags: [1],
  },
  {
    id: 3,
    title: '78.01.21 Организация научно-исследовательских, опытно-конструкторских и проектных работ в интересах обороны',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 1,
    tags: [1],
  },
  {
    id: 4,
    title: '78.01.25 Патентное дело. Изобретательство и рационализаторство',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 1,
    tags: [1],
  },
  {
    id: 5,
    title: '78.01.29 Информационная деятельность',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 1,
    tags: [1],
  },
  {
    id: 6,
    title: '78.03.02 Общие проблемы войны',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 2,
    tags: [1],
  },
  {
    id: 7,
    title: '78.03.03 Сущность войн, категории, законы, принципы вооруженной борьбы',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 2,
    tags: [1],
  },
  {
    id: 8,
    title: '78.03.15 Классификация войн и военных конфликтов',
    creationTime: new Date('2019-08-13'),
    updateTime: new Date('2019-08-13'),
    version: 1,
    content: '',
    parentId: 2,
    tags: [1],
  },
];

@Injectable()
export class ArticleService {
  private counter = 8;
  public articles: Article[] = mockArticles;
  public update: EventEmitter<any> = new EventEmitter();

  constructor(
    private tagService: TagService,
    private http: HttpClient,
  ) {}

  public add({ title, content, parentId }: AddParams) {
    const id = ++this.counter;
    const creationTime = new Date();
    const updateTime = creationTime;
    const version = 1;
    const tags: number[] = [];
    this.articles.push({ id, title, content, parentId, creationTime, updateTime, version, tags });
    this.update.emit();
    return id;
  }

  public edit(id: number, params: Partial<AddParams>): void {
    // this.articles.forEach((article, index) => {
    //   if (article.id === id) {
    //     const version = article.version + 1;
    //     const updateTime = new Date();
    //     this.articles[index] = { ...article, ...params, version, updateTime };
    //   }
    // });
    // this.update.emit();
    console.log(id);
    this.http.put(
      `/api/article/${id}`,
      {article: {title: 'new test'}},
    ).subscribe();
  }

  public getById(id: number) {
    return this.http.get(`/api/article/${id}`)
      .pipe(catchError((error): any => {
        window.alert(`Не существует статьи по адресу ${error.url}. Ошибка ${error.status}`);
      }));
  }

  public getAll() {
    return this.http.get('/api/article');
  }

  public delete(id: number): void {
    // this.http.delete();
  }

  public search(searchString: string): Article[] {
    searchString = searchString.toLowerCase();
    return searchString ? this.articles.filter(article => {
      return article.title.toLowerCase().includes(searchString) ||
        article.content.toLowerCase().includes(searchString) ||
        this.getArticleTags(article).findIndex(tag => tag.value.toLowerCase() === searchString) >= 0;
    })
      : [];
  }

  // public deleteTagFromArticle(articleId, tagId) {
  //   const article = this.get(articleId);
  //   const tagIndex = article.tags.findIndex(t => t === tagId);
  //   article.tags.splice(tagIndex, 1);
  // }

  // public addTagToArticle(articleId: number, tagId: number) {
  //   const article = this.get(articleId);
  //   article.tags.push(tagId);
  // }

  private getArticleTags(article: Article): Tag[] {
    const result: Tag[] = [];

    for (const tagId of article.tags) {
      result.push(this.tagService.getById(tagId));
    }

    return result;
  }
}
