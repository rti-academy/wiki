import { Component, OnInit , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-rubric-dialog',
  templateUrl: './update-rubric-dialog.component.html',
  styleUrls: ['./update-rubric-dialog.component.css']
})
export class UpdateRubricDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateRubricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
