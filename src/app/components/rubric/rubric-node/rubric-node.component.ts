import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from '@app/models/tree-node';
import { SidenavService } from '@app/services/sidenav.service';
import { BreakpointService } from '@app/services/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rubric-node',
  templateUrl: './rubric-node.component.html',
  styleUrls: ['./rubric-node.component.css']
})
export class RubricNodeComponent implements OnInit {

  public menuUp = false;
  public nodeHover = false;

  private isHandset: boolean;
  private isSmall: boolean;

  @Input()
  public node: TreeNode;

  constructor(
    private sidenavService: SidenavService,
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

  public sidenavClose() {
    if (this.isSmall || this.isHandset) {
      this.sidenavService.close();
    }
  }

}
