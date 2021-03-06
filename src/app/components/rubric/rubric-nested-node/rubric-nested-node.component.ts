import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from '@app/models/tree-node';
import { forkJoin, Observable } from 'rxjs';
import { RubricService } from '@app/services/rubric.service';
import { ArticleService } from '@app/services/article.service';
import { Rubric } from '@app/models/rubric';
import { DialogService } from '@app/services/dialog.service';
import { RubricTreeService } from '@app/services/rubric-tree.service';
import { Router } from '@angular/router';
import { BreakpointService } from '@app/services/breakpoint.service';

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

  public isHandset: boolean;
  public isSmall: boolean;

  constructor(
    private rubricService: RubricService,
    private articleService: ArticleService,
    private dialogService: DialogService,
    private rubricTreeService: RubricTreeService,
    private router: Router,
    private breakpointService: BreakpointService,
  ) {
    breakpointService.getHandset().subscribe(result => {
      this.isHandset = result;
    });

    breakpointService.getSmall().subscribe(result => {
      this.isSmall = result;
    });
  }

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
            this.router.navigate(['']);
            this.rubricTreeService.rerenderTree.emit('openDeleteDialog');
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
          this.rubricTreeService.rerenderTree.emit('openSetRubricDialog');
        });
      }
    });
  }

  public openAddRubricDialog(parentId: number): void {
    this.dialogService.openSaveRubricDialog({
      title: 'Добавление новой рубрики',
      rubricTitle: '',
    })
    .subscribe(result => {
      if (result) {
        this.rubricService.addRubric(result, parentId)
          .subscribe(() => {
            this.rubricTreeService.rerenderTree.emit('openAddRubricDialog');
          });
      }
    });
  }

  public openUpdateRubricDialog(node: Rubric): void {
    this.dialogService.openSaveRubricDialog({
      title: 'Редактирование рубрики',
      rubricTitle: node.title,
    })
    .subscribe(result => {
      if (result) {
        this.rubricService.updateRubric({ id: node.id, title: result, parentId: node.parentId })
          .subscribe((response) => {
            this.rubricTreeService.rerenderTree.emit('openUpdateRubricDialog');
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
