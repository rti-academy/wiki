import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ArticleService } from '@app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  private id: number;
  private parentId: number;
  private title = '';
  private content = '';
  private action: string;

  private quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ size: ['small', 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6] }],
      [{ font: [] }],
      ['link', 'image'],
    ]
  };

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.action = params.get('action');
      if (this.action === 'edit') {
        this.id = +params.get('id');
        this.articleService.getById(this.id)
          .subscribe((response: any) => {
            this.title = response.article.title;
            this.content = response.article.content;
          });
      }
      if (this.action === 'add') {
        this.parentId = +params.get('id');
      }
    });
  }

  private goBack(): void {
    this.location.back();
  }

  private saveChange() {
    this.articleService.edit(
      this.id, {
        title: this.title,
        content: this.content,
      }).subscribe(() => this.goBack());
  }

  private createArticle() {
    this.articleService.add({
      title: this.title,
      content: this.content,
      parentId: this.parentId,
      type: 'note',
    }).subscribe((response: any) => {
      console.log(response.id);
      this.router.navigateByUrl(`/articles/${response.id}`)
        .then(() => {
          window.location.reload(); // Временный костыль
        });
    });
  }

  private save() {
    if (this.action === 'edit') {
      this.saveChange();
    }

    if (this.action === 'add') {
      this.createArticle();
    }
  }

}
