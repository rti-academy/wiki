import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { RubricService } from '@app/services/rubric.service';
import { DialogService } from '@app/services/dialog.service';
import { RubricTreeService } from '@app/services/rubric-tree.service';
import { TreeNode } from '@app/models/tree-node';


@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.css']
})

export class RubricComponent implements OnInit {

  treeControl: NestedTreeControl<TreeNode>;
  dataSource: MatTreeNestedDataSource<TreeNode>;

  constructor(
    private rubricService: RubricService,
    private dialogService: DialogService,
    private rubricTreeService: RubricTreeService,
  ) { }

  ngOnInit() {
    this.treeControl = this.rubricTreeService.getTreeControl();
    this.dataSource = this.rubricTreeService.getDataSource();
    this.rubricTreeService.loadTree();
    this.rubricTreeService.activeNodeSubscribe();
  }
 

  public openAddRubricDialog(parentId: number): void {
    this.dialogService.openSaveRubricDialog({
      title: 'Добавление новой рубрики',
      rubricTitle: '',
    }).subscribe(result => {
      if (result) {
        this.rubricService.addRubric(result, parentId)
          .subscribe(() => {
            this.rubricTreeService.rerenderTree.emit('openAddRubricDialog');
          });
      }
    });
  }

  isRubric = (_: number, node: TreeNode) => node.type === 'rubric';
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}
