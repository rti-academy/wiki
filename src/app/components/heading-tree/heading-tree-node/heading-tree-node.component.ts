import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { ArticleTreeNode } from '@app/models/articles-tree';
import { ArticleService, AddParams } from '@app/services/article.service';

@Component({
  selector: 'app-heading-tree-node',
  templateUrl: './heading-tree-node.component.html',
  styleUrls: ['./heading-tree-node.component.css']
})
export class HeadingTreeNodeComponent implements OnInit {

  @Input()
  public articleTreeNode: ArticleTreeNode;
  @Input()
  public id: number;

  constructor() { }

  ngOnInit() {

  }

}
