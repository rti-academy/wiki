import { Component, OnInit, Input } from '@angular/core';
<<<<<<< HEAD
import { TreeNode } from '@app/models/tree-node';
=======
import { TreeNode } from '../rubric.component';
import { AddRubricDialogComponent } from '../add-rubric-dialog/add-rubric-dialog.component';
import { UpdateRubricDialogComponent } from '../update-rubric-dialog/update-rubric-dialog.component';
import { SetRubricDialogComponent } from '@app/components/set-rubric-dialog/set-rubric-dialog.component';
import { DeleteRubricDialogComponent } from '../delete-rubric-dialog/delete-rubric-dialog.component';
>>>>>>> 0c39d4a9b87f3515c8bcd436fe274e4dfe09f82c
import { forkJoin, Observable } from 'rxjs';
import { RubricService } from '@app/services/rubric.service';
import { ArticleService } from '@app/services/article.service';
import { Rubric } from '@app/models/rubric';
<<<<<<< HEAD
import { DialogService } from '@app/services/dialog.service';
import { BreakpointService } from '@app/services/breakpoint.service';
import { RubricTreeService } from '@app/services/rubric-tree.service';
import { Router } from '@angular/router';
=======
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
>>>>>>> 0c39d4a9b87f3515c8bcd436fe274e4dfe09f82c

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

<<<<<<< HEAD
  public isHandset: Observable<boolean> = this.breakpointService.getHandset();
  public isSmall: Observable<boolean> = this.breakpointService.getSmall();
=======
  public isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  public isSmall: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );
>>>>>>> 0c39d4a9b87f3515c8bcd436fe274e4dfe09f82c

  constructor(
    private rubricService: RubricService,
    private articleService: ArticleService,
<<<<<<< HEAD
    private dialogService: DialogService,
    private breakpointService: BreakpointService,
    private rubricTreeService: RubricTreeService,
    private router: Router,
=======
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
>>>>>>> 0c39d4a9b87f3515c8bcd436fe274e4dfe09f82c
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
          window.location.reload();
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
