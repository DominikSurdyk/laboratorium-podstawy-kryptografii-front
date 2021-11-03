import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-series-visualization',
  styleUrls: ['./series-visualization.component.scss'],
  template: `
    <mat-card class="container">
        <div *ngFor="let item of series$ | async"
             class="item"
             [ngClass]="{'true': item, 'false': !item}"
        ></div>
    </mat-card>
  `
})
export class SeriesVisualizationComponent implements OnInit {

  @Input()
  series$: Observable<boolean[]> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
