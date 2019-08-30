import { Component } from '@angular/core';
import { BreakpointService } from './services/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wiki';

  public isHandset: Observable<boolean> = this.breakpointServise.getHandset();
  public isSmall: Observable<boolean> = this.breakpointServise.getSmall();

  constructor(
    private breakpointServise: BreakpointService,
  ) { }

}
