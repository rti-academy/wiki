import { Component, OnInit } from '@angular/core';
import { ArticleService } from '@app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  private id: number;
  private title = '';
  private content = '';
  private action: string;

  private quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{'align': []}],
    ]
  };

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.action = params.get('action');
      this.id = +params.get('id');
      const article = this.articleService.get(this.id);

      if (this.action === 'edit') {
        this.title = article.title;
        this.content = article.content;
      }
    });
  }

  private saveChange() {
    this.articleService.edit(
      this.id, {
        title: this.title,
        content: this.content,
      });
  }

  private addChildArticle() {
    this.id = this.articleService.add({
      title: '',
      content: '',
      parentId: this.id,
    });
  }

  private save() {
    if (this.action === 'add') {
      this.addChildArticle();
    }
    this.saveChange();
    this.router.navigate([`/articles/${this.id}`]);
  }

}