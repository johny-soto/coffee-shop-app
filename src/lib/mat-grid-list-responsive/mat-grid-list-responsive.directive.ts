import {
  Directive,
  OnInit,
  OnChanges,
  OnDestroy,
  Host,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { Observable, BehaviorSubject, Subscription, merge, of } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatGridList } from '@angular/material/grid-list';

function calCols(matchedBreakpoint: MatchedBreakpoint): number {
  switch (matchedBreakpoint) {
    case MatchedBreakpoint.XLarge:
      return 8;
    case MatchedBreakpoint.Large:
      return 6;
    case MatchedBreakpoint.Medium:
      return 4;
    case MatchedBreakpoint.Small:
      return 2;
    case MatchedBreakpoint.XSmall:
    default:
      return 1;
  }
}

enum MatchedBreakpoint {
  XLarge,
  Large,
  Medium,
  Small,
  XSmall
}

@Directive({
  selector: '[appResponsive]',
  exportAs: 'matGridListResponsive'
})
export class MatGridListResponsiveDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appResponsive') responsive = false;
  private responsive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.responsive);

  @Output() colsChange: EventEmitter<number> = new EventEmitter<number>();

  private breakPointObservable: Observable<MatchedBreakpoint>;
  private breakPointObserverSubscription = Subscription.EMPTY;

  constructor(
    @Host() private matGridList: MatGridList,
    private breakpointObserver: BreakpointObserver
  ) {
    this.matGridList.cols = 1;

    const buildObservable = (alias: MatchedBreakpoint, breakPoint: string): Observable<MatchedBreakpoint> =>
      this.breakpointObserver.observe(breakPoint)
        .pipe(
          filter(state => state.matches),
          map(() => alias)
        );
    this.breakPointObservable = merge(
      buildObservable(MatchedBreakpoint.XLarge, Breakpoints.XLarge),
      buildObservable(MatchedBreakpoint.Large, Breakpoints.Large),
      buildObservable(MatchedBreakpoint.Medium, Breakpoints.Medium),
      buildObservable(MatchedBreakpoint.Small, Breakpoints.Small),
      buildObservable(MatchedBreakpoint.XSmall, Breakpoints.XSmall)
    );
  }

  ngOnInit() {
    this.breakPointObserverSubscription = this.responsive$
      .pipe(
        switchMap(responsive => responsive ? this.breakPointObservable : of(MatchedBreakpoint.XSmall)),
        map(matchedBreakpoint => calCols(matchedBreakpoint))
      )
      .subscribe(cols => this.setCols(cols));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.responsive) {
      this.responsive$.next(changes.responsive.currentValue);
    }
  }

  ngOnDestroy() {
    if (this.breakPointObserverSubscription) {
      this.breakPointObserverSubscription.unsubscribe();
      this.breakPointObserverSubscription = undefined;
    }
  }

  private setCols(cols: number) {
    this.colsChange.emit(cols);
    this.matGridList.cols = cols;
  }

}

