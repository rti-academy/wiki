import { Component, OnInit , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-rubric-dialog',
  templateUrl: './add-rubric-dialog.component.html',
  styleUrls: ['./add-rubric-dialog.component.css']
})
export class AddRubricDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef< AddRubricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
