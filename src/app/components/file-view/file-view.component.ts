import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FileService } from '@app/services/file.service';
import { AttachedFile } from '@app/models/attached-file';
import { DeleteDialogComponent } from '@app/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit, OnChanges {

  @Input()
  public articleId: number;
  @Input()
  public deleteEnabled: boolean = false;
  public files: AttachedFile[] = [];
  public filesToDelete: number [] = [];
  constructor(private fileService: FileService, private dialog: MatDialog) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.articleId){
      this.loadArticleFiles();
    }
  }
  public loadArticleFiles() {
    this.fileService.getByArticleId(this.articleId).subscribe((result: any) => {
      this.files = result.files;
    });
  }
  public deleteFile(index: number) {
    const fileToDelete: AttachedFile = this.files.splice(index, 1)[0];
    this.filesToDelete.push(fileToDelete.id);
  }

}
