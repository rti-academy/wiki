import { Injectable } from '@angular/core';
import { Rubric } from '@app/models/rubric';
import { ArticleService } from './article.service';

const rubricMock = [
  { id: 1, title: '78.01 Общие вопросы военного дела' },
  { id: 2, title: '78.03 Учения о войне и армии' },
];

@Injectable({
  providedIn: 'root'
})

export class RubricService {

  constructor(private articleService: ArticleService) { }
  private rubrics: Rubric[] = rubricMock;

  public getAll(): Rubric[] {
    return this.rubrics;
  }

  public getChildren(id: number) {
    // return this.articleService.getAll().filter(article => article.parentId === id);
  }
}
