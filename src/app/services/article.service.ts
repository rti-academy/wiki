import { Article } from '../models/article';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface AddParams {
  title: string;
  type: string;
  content: string;
  parentId: number;
  status: string;
}

@Injectable()
export class ArticleService {
  public update: EventEmitter<any> = new EventEmitter();

  // private mockStatus = ['actual', 'archive', 'draft'];

  constructor(
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

  public search(query?: string, type: string = 'note'): Observable<Article[]> {
    let params = new HttpParams()
      .set('type', type);

    if (query) {
      params = params.set('query', query);
    }

    return this.http.get('/api/article', { params })
      .pipe(
        map((response: any) => response.articles)
      );
  }

  // public getStatus() {
  //   return this.mockStatus;
  // }
}
