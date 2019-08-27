import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ArticleService } from '@app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleStatusService, StatusValueViewPair } from '@app/services/article-status.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileService } from '@app/services/file.service';
import { forkJoin, Observable } from 'rxjs';
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
  public statuses: StatusValueViewPair[];
  public articleStatus: string;
  @ViewChild(FileUploaderComponent, { static: false })
  fileUploader: FileUploaderComponent;
  public uploadForm: FormGroup;

  public quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
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
    private articleStatusService: ArticleStatusService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private fileService: FileService,
    private formBuilder: FormBuilder,
  ) {
    this.statuses = articleStatusService.statuses;
  }

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
          });
      }
      if (this.action === 'add') {
        this.parentId = +params.get('id');
        this.title = '';
        this.content = '';
        this.articleStatus = 'draft';
      }
    });
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
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
    const editArticleRequest: Observable<any> = this.articleService.edit(
      this.id, {
        title: this.title,
        content: this.content,
        status: this.articleStatus,
      });

    const fileRequest = this.fileRequests(this.id);
    fileRequest.push(editArticleRequest);
    forkJoin(fileRequest).subscribe(() => {
      window.location.replace(`/articles/${this.id}`); // Временный костыль
    });
  }

  private createArticle() {
    this.articleService.add({
      title: this.title,
      content: this.content,
      parentId: this.parentId,
      type: 'note',
      status: this.articleStatus,
    }).subscribe((response: any) => {

      const fileRequests = this.fileRequests(response.id);

      if (fileRequests.length > 0) {
        forkJoin(fileRequests).subscribe(() => {
          window.location.replace(`/articles/${response.id}`); // Временный костыль
        });
      } else {
        window.location.replace(`/articles/${response.id}`); // Временный костыль
      }
    });
  }
  private fileRequests(articleId: number) {
    const uploadRequests = this.fileUploader.files
      .map(file => {
        this.uploadForm.get('profile').setValue(file);
        const formData = new FormData();
        formData.append('file', this.uploadForm.get('profile').value);
        return this.fileService.upload(formData, articleId);
      });
    const deleteRequests = this.fileUploader.fileView.filesToDelete
      .map(fileId =>
        this.fileService.delete(fileId, articleId)
      );
    return uploadRequests.concat(deleteRequests);
  }

}
