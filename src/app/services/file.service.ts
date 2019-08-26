import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public upload(file: FormData, articleId: number){
    return this.http.post(`/api/article/${articleId}/file`, file);
  }

  public getByArticleId(articleId: number) {
    return this.http.get(`/api/article/${articleId}/file`);
  }
  public download(fileId: number, articleId: number) {
    console.log(articleId);
    console.log(fileId);
    return this.http.get(`/api/article/${articleId}/file/${fileId}`);
  }
}
