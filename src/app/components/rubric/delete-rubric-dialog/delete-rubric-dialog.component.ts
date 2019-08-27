import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-rubric-dialog',
  templateUrl: './delete-rubric-dialog.component.html',
  styleUrls: ['./delete-rubric-dialog.component.css']
})

export class DeleteRubricDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteRubricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
