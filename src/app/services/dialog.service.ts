import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteDialogData } from '@app/components/delete-dialog/delete-dialog.component';
import { SetRubricDialogComponent, SetRubricDialogData } from '@app/components/set-rubric-dialog/set-rubric-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { SaveRubricDialogData, SaveRubricDialogComponent } from '@app/components/save-rubric-dialog/save-rubric-dialog.component';

@Injectable()
export class DialogService {

  private dialogWitdh = '400px';

  constructor(
    private dialog: MatDialog,
  ) { }

  public openDeleteDialog(data: DeleteDialogData) {
    return this.openDialog<DeleteDialogComponent, DeleteDialogData>(DeleteDialogComponent, data);
  }

  public openSetRubricDialog(data: SetRubricDialogData) {
    return this.openDialog<SetRubricDialogComponent, SetRubricDialogData>(SetRubricDialogComponent, data);
  }

  public openSaveRubricDialog(data: SaveRubricDialogData) {
    return this.openDialog<SaveRubricDialogComponent, SaveRubricDialogData>(SaveRubricDialogComponent, data);
  }
  private openDialog<T1, T2>(type: ComponentType<T1> | TemplateRef<T1>, data: T2) {
    const width = this.dialogWitdh;
    const dialogRef = this.dialog.open(
      type,
      {
        width,
        data,
      },
    );
    return dialogRef.afterClosed();
  }
}
