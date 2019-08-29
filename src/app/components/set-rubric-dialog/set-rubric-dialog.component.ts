import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from '@app/models/article';

export interface SetRubricDialogData {
  includedNodeParentIDs: number[];
  excludedNodeParentIDs: number[];
}

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
    @Inject(MAT_DIALOG_DATA) public data: SetRubricDialogData,
  ) { }

  public ngOnInit() {
  }

  public setRubric(event: Article): void {
    this.result = event.id;
    this.disabled = false;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
