import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public upload(file: FormData, articleId: number){
    console.log(articleId);
    return this.http.post(`/api/article/${articleId}/file`, file);
  }

  public getByArticleId(articleId: number) {
    return this.http.get(`/api/article/${articleId}/file`);
  }

  public download(fileId: number, articleId: number) {
    return this.http.get(`/api/article/${articleId}/file/${fileId}`)
    .pipe(
      map((response: any) => console.log(response))
    );
  }
  public delete(fileId: number, articleId: number) {
    return this.http.delete(`/api/article/${articleId}/file/${fileId}`);
  }
}
