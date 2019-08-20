import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { RubricService } from '@app/services/rubric.service';
import { ArticleService } from '@app/services/article.service';
import { filter } from 'rxjs/operators';

interface treeNode {
  id: number;
  title: string;
  children?: treeNode[];
}

@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.css']
})

export class RubricComponent implements OnInit {

  treeControl = new NestedTreeControl<treeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  constructor(private rubricService: RubricService,private articleService: ArticleService) {
    const rubrics = this.rubricService.getAll();
    rubrics.forEach(rubric => {
      this.dataSource.data.push({
        id: rubric.id,
        title: rubric.title,
        children: this.rubricService.getChildren(rubric.id)});
    });

  }

  ngOnInit() {

  }

  hasChild = (_: number, node: treeNode) => !!node.children && node.children.length > 0;
}
