import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileViewComponent } from '../file-view/file-view.component';
import { Observable } from 'rxjs';


interface UploaderItem {
  file: File;
  isUploaded: boolean;
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit, OnChanges {
  public uploadForm: FormGroup;
  @Input()
  public articleId: number;
  @Input()
  public isUploading = false;
  @ViewChild(FileViewComponent, { static: false })
  fileView: FileViewComponent;
  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef<HTMLInputElement>;

  uploadRequests: Observable<any>[] = [];
  //public files: File[] = [];
  public uploaderItems: UploaderItem[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  ngOnChanges() {
  }
  public onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const isUploaded = false;
      this.uploaderItems.push({ file, isUploaded })
      //this.files.push(file);
      this.fileUpload.nativeElement.value = '';
    }
  }
  public delete(index: number) {
    // this.files.splice(index, 1);
    this.uploaderItems.splice(index, 1);
  }
}
