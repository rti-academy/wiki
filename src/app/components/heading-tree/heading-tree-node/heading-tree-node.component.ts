import { Component, OnInit, Input } from '@angular/core';
import { ArticleTreeNode } from '../../../models/articles-tree';

@Component({
  selector: 'app-heading-tree-node',
  templateUrl: './heading-tree-node.component.html',
  styleUrls: ['./heading-tree-node.component.css']
})
export class HeadingTreeNodeComponent implements OnInit {

  @Input()
  public articleTreeNode: ArticleTreeNode;

  constructor() { }

  ngOnInit() {

  }

}
