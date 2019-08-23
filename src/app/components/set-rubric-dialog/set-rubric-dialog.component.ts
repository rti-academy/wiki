import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Article } from '@app/models/article';

@Component({
  selector: 'app-set-rubric-dialog',
  templateUrl: './set-rubric-dialog.component.html',
  styleUrls: ['./set-rubric-dialog.component.css']
})
export class SetRubricDialogComponent implements OnInit {

  public result: number;
  public disabled = true;

  constructor(
    public dialogRef: MatDialogRef<SetRubricDialogComponent>,
  ) { }

  ngOnInit() {
  }

  public setRubric(event: Article): void {
    this.result = event.id;
    this.disabled = false;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
