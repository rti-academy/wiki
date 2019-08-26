import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from '@app/services/file.service';
import { AttachedFile } from '@app/models/attached-file';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  public uploadForm: FormGroup;
  @Input()
  public articleId: number;
  public files: AttachedFile[] = [];
  constructor(private formBuilder: FormBuilder, private fileService: FileService) { }

  ngOnInit() {
    this.fileService.getByArticleId(this.articleId).subscribe((result: any) => {
      this.files = result.files;
    })
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value);
      this.fileService.upload(formData, this.articleId).subscribe();
    }
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.uploadForm.get('profile').value);
  //   this.fileService.upload(formData, this.articleId).subscribe(response =>
  //     console.log(response));
  // }
}
