import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from '@app/models/tree-node';
import { forkJoin, Observable } from 'rxjs';
import { RubricService } from '@app/services/rubric.service';
import { ArticleService } from '@app/services/article.service';
import { Rubric } from '@app/models/rubric';
import { DialogService } from '@app/services/dialog.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

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

  constructor(
    private rubricService: RubricService,
    private articleService: ArticleService,
    private dialogService: DialogService,
    private breakpointObserver: BreakpointObserver,
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
    this.dialogService.openSaveRubricDialog({
      title: 'Добавление новой рубрики',
      rubricTitle: '',
    })
    .subscribe(result => {
      if (result) {
        this.rubricService.addRubric(result, parentId)
          .subscribe(() => {
            window.location.reload(); // Временный костыль
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
