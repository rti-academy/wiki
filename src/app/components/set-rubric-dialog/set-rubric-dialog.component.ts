import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-rubric-dialog',
  templateUrl: './set-rubric-dialog.component.html',
  styleUrls: ['./set-rubric-dialog.component.css']
})
export class SetRubricDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SetRubricDialogComponent>,
  ) { }

  ngOnInit() {
  }

}
