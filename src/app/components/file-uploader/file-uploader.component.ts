import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from '@app/services/file.service';
import { AttachedFile } from '@app/models/attached-file';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit, OnChanges {
  public uploadForm: FormGroup;
  @Input()
  public articleId: number;
  public files: AttachedFile[] = [];

  constructor(private formBuilder: FormBuilder,
              private fileService: FileService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  ngOnChanges() {
    this.loadArticleFiles();
  }
  private loadArticleFiles() {
    this.fileService.getByArticleId(this.articleId).subscribe((result: any) => {
      this.files = result.files;
    });
  }
  public onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value);
      this.fileService.upload(formData, this.articleId).subscribe(() => this.loadArticleFiles());
    }
  }
  public deleteFile(file: AttachedFile) {
    this.fileService.delete(file.id, this.articleId).subscribe((response: any) =>
    this.loadArticleFiles());
  }

  public openDeleteDialog(file: AttachedFile): void {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        width: '400px',
        data: `файл ${file.name}`,
      },
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileService.delete(file.id, this.articleId).subscribe((response: any) =>
        this.loadArticleFiles());
      }
    });
  }
}
