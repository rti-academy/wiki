import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE_TAG_URL = '/api/tag';
const BASE_ARTICLE_URL = '/api/article';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public addTagToArticle(articleId: number, value: string): Observable<unknown> {
    return this.httpClient.post(`${BASE_ARTICLE_URL}/${articleId}/tag`, { tag: { articleId, value } });
  }

  public getTagsByArticle(articleId: number): Observable<Tag[]> {
    return this.httpClient.get(`${BASE_ARTICLE_URL}/${articleId}/tag`)
      .pipe(
        map((response: any) => response.tags)
      );
  }

  public search(query?: string): Observable<Tag[]> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    return this.httpClient.get(BASE_TAG_URL, { params })
      .pipe(
        map((response: any) => response.tags)
      );
  }

  public deleteTagFormArticle(articleId: number, tagId: number): Observable<unknown> {
    return this.httpClient.delete(`${BASE_ARTICLE_URL}/${articleId}/tag/${tagId}`);
  }

}
