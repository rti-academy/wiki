import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from '../rubric.component';
import { AddRubricDialogComponent } from '../add-rubric-dialog/add-rubric-dialog.component';
import { UpdateRubricDialogComponent } from '../update-rubric-dialog/update-rubric-dialog.component';
import { forkJoin } from 'rxjs';
import { RubricService } from '@app/services/rubric.service';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '@app/services/article.service';
import { Rubric } from '@app/models/rubric';
import { DialogService } from '@app/services/dialog.service';

@Component({
  selector: 'app-rubric-nested-node',
  templateUrl: './rubric-nested-node.component.html',
  styleUrls: ['./rubric-nested-node.component.css']
})
export class RubricNestedNodeComponent implements OnInit {

  public menuUp = false;
  public nodeHover = false;

  @Input()
  public node: TreeNode;

  @Input()
  public expanded = false;

  constructor(
    private rubricService: RubricService,
    private articleService: ArticleService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
  }

  public openDeleteDialog(node: TreeNode): void {
    const nodesToDelete = this.convertNodeTreeToList(node);
    const nodeTitlesToDelete = nodesToDelete.map(n => n.title);

    this.dialogService.openDeleteDialog({
      title: 'Вы уверены, что хотите удалить следующие элементы?',
      itemsToDelete: nodeTitlesToDelete,
    })
    .subscribe(result => {
      if (result) {
        const deleteRequests = nodesToDelete
          .map(n => this.articleService.delete(n.id));

        forkJoin(deleteRequests)
          .subscribe(() => {
            window.location.replace('/'); // Временный костыль
          });
      }
    });
  }

  public openSetRubricDialog(node: TreeNode): void {
    this.dialogService.openSetRubricDialog({
      includedNodeParentIDs: [0],
      excludedNodeParentIDs: []
    })
    .subscribe(result => {
      if (result) {
        node.parentId = result;
        this.rubricService.updateRubric(node).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  public openAddRubricDialog(parentId: number): void {
    const dialogRef = this.dialog.open(
      AddRubricDialogComponent,
      {
        width: '400px',
      },
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rubricService.addRubric(result, parentId)
          .subscribe(() => {
            window.location.reload(); // Временный костыль
          });
      }
    });
  }

  public openUpdateRubricDialog(node: Rubric): void {
    const dialogRef = this.dialog.open(
      UpdateRubricDialogComponent,
      {
        width: '400px',
        data: node.title,
      },
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rubricService.updateRubric({ id: node.id, title: result, parentId: node.parentId })
          .subscribe((response) => {
            window.location.reload(); // Временный костыль
          });
      }
    });
  }

  private convertNodeTreeToList(node: TreeNode, initial: TreeNode[] = []) {
    initial.push(node);

    for (const childNode of node.children) {
      this.convertNodeTreeToList(childNode, initial);
    }

    return initial;
  }

}
