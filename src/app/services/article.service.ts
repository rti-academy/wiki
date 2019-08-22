import { Article } from '../models/article';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tag } from '@app/models/tag';
import { TagService } from './tag.service';

export interface AddParams {
  title: string;
  type: string;
  content: string;
  parentId: number;
}

@Injectable()
export class ArticleService {
  public update: EventEmitter<any> = new EventEmitter();

  constructor(
    private tagService: TagService,
    private http: HttpClient,
  ) {}

  public add(params: Partial<AddParams>) {
    return this.http.post(
      `/api/article`,
      {article: params},
    );
  }

  public edit(id: number, params: Partial<AddParams>) {
    return this.http.put(
      `/api/article/${id}`,
      {article: params},
    );
  }

  public getAll() {
    return this.http.get('api/article?type=note');
  }

  public getById(id: number) {
    return this.http.get(`/api/article/${id}`)
      .pipe(catchError((error): any => {
        window.alert(`Не существует статьи по адресу ${error.url}. Ошибка ${error.status}`);
      }));
  }

  public delete(id: number) {
    return this.http.delete(`/api/article/${id}`);
  }

  // public search(searchString: string): Article[] {
  //   searchString = searchString.toLowerCase();
  //   return searchString ? this.articles.filter(article => {
  //     return article.title.toLowerCase().includes(searchString) ||
  //       article.content.toLowerCase().includes(searchString) ||
  //       this.getArticleTags(article).findIndex(tag => tag.value.toLowerCase() === searchString) >= 0;
  //   })
  //     : [];
  // }

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
