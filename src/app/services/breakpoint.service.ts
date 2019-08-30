import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  public getHandset() {
    return this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay(),
      );
  }

  public getSmall() {
    return this.breakpointObserver
      .observe(Breakpoints.Small)
      .pipe(
        map(result => result.matches),
        shareReplay(),
      );
  }
}
