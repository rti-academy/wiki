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

  public id: number;
  public parentId: number;
  public title: string;
  public content: string;
  public action: string;
  public mockStatus = [
    {value: 'archive', view: 'В архиве'},
    {value: 'active', view: 'Актуальный'},
    {value: 'draft', view: 'Черновик'},
  ];
  public articleStatus: string;

  public quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ size: ['small', 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ['link', 'image'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.action = params.get('action');
      if (this.action === 'edit') {
        this.id = +params.get('id');
        this.articleService.getById(this.id)
          .subscribe((response: any) => {
            this.title = response.article.title;
            this.content = response.article.content;
            this.articleStatus = response.article.status;
            console.log(this.articleStatus);
          });
      }
      if (this.action === 'add') {
        this.parentId = +params.get('id');
        this.title = '';
        this.content = '';
        this.articleStatus = 'draft';
      }
    });

    // this.articleService.getStatus().forEach((value) => {
    //   this.mockStatus.push(value);
    // });
  }

  public goBack(): void {
    this.location.back();
  }

  public save() {
    if (this.action === 'edit') {
      this.saveChange();
    }

    if (this.action === 'add') {
      this.createArticle();
    }
  }

  private saveChange() {
    this.articleService.edit(
      this.id, {
        title: this.title,
        content: this.content,
        status: this.articleStatus,
      }).subscribe(() => this.goBack());
  }

  private createArticle() {
    this.articleService.add({
      title: this.title,
      content: this.content,
      parentId: this.parentId,
      type: 'note',
      status: this.articleStatus,
    }).subscribe((response: any) => {
      console.log(response.id);
      this.router.navigateByUrl(`/articles/${response.id}`)
        .then(() => {
          window.location.reload(); // Временный костыль
        });
    });
  }

}
