import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { RubricService } from '@app/services/rubric.service';
import { ArticleService } from '@app/services/article.service';
import { filter } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { Router, NavigationEnd } from '@angular/router';

interface TreeNode {
  id: number;
  title: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.css']
})

export class RubricComponent implements OnInit {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  id: number;

  constructor(private rubricService: RubricService,
              private articleService: ArticleService,
              private router: Router, ) {
    const rubrics = this.rubricService.getAll();
    rubrics.forEach(rubric => {
      this.dataSource.data.push({
        id: rubric.id,
        title: rubric.title,
        // children: this.rubricService.getChildren(rubric.id)
      });
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
      this.id = this.getIdFromUrl();
      this.expandActive();
      });
  }

  private expandActive() {
    // this.dataSource.data.forEach(node => {
    //   if (node.children.filter(childNode => childNode.id === this.id).length !== 0) {
    //     this.treeControl.expand(node);
    //   }
    // }
    // );
  }
  getIdFromUrl(): number {
    const parts = location.pathname.split('/');
    return parts.length > 2 ? Number(parts[2]) : null;
  }
  ngOnInit() {

  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}
