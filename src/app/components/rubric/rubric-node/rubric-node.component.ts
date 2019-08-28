import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from '../rubric.component';

@Component({
  selector: 'app-rubric-node',
  templateUrl: './rubric-node.component.html',
  styleUrls: ['./rubric-node.component.css']
})
export class RubricNodeComponent implements OnInit {

  public menuUp = false;
  public nodeHover = false;

  @Input()
  public node: TreeNode;

  constructor() { }

  ngOnInit() {
  }

}
