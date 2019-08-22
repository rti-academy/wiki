import { Injectable } from '@angular/core';
import { Rubric } from '@app/models/rubric';
import { ArticleService } from './article.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const rubricMock = [
  { id: 1, title: '78.01 Общие вопросы военного дела' },
  { id: 2, title: '78.03 Учения о войне и армии' },
];

@Injectable({
  providedIn: 'root'
})

export class RubricService {

  constructor(private articleService: ArticleService, private http: HttpClient) { }
  private rubrics: Rubric[] = rubricMock;


  // public getAll() {
  //   return this.rubrics;
  // }
  public getAll() {
    return this.http.get('api/article?type=rubric');
  }


  public addRubric(title:string) {
    return this.http.post('api/article', {
      article: {
        title: title,
        type: "rubric",
        parentId:0,
      }
    });
  }

  public deleteRubric(id:number){
    return this.http.delete(`api/article/${id}`);
  }

  public updateRubric(rubric: Rubric){
    return this.http.put<Rubric>(`/api/article/${rubric.id}`, {
      article:{
        title: rubric.title,
      }
    });
  };


}
