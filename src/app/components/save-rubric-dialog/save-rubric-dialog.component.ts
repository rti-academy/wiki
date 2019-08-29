import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SaveRubricDialogData {
  title: string;
  rubricTitle: string;
}

@Component({
  selector: 'app-save-rubric-dialog',
  templateUrl: './save-rubric-dialog.component.html',
  styleUrls: ['./save-rubric-dialog.component.css']
})
export class SaveRubricDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SaveRubricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SaveRubricDialogData
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
