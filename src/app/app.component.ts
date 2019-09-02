import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointService } from './services/breakpoint.service';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wiki';

  @ViewChild('sidenav', { static: true })
  public sidenav: MatSidenav;

  public isHandset: boolean;
  public isSmall: boolean;

  constructor(
    private breakpointServise: BreakpointService,
    private sidenavService: SidenavService,
  ) {
    breakpointServise.getHandset().subscribe(result => {
      this.isHandset = result;
    });

    breakpointServise.getSmall().subscribe(result => {
      this.isSmall = result;
    });
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
