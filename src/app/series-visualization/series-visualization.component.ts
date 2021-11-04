import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-series-visualization',
  styleUrls: ['./series-visualization.component.scss'],
  template: `
    <div class="container">
      <mat-card  class="visualization-panel-container">
        <button *ngIf="!showPanel" mat-raised-button color="accent" (click)="showPanel=true">Wizualizacja</button>
        <div *ngIf="showPanel" class="visualization-panel">
          <div *ngFor="let item of series"
               class="item"
               [ngClass]="{'true': item, 'false': !item}"
          ></div>
        </div>
        <div class="series-panel">
          {{series | boolToString}}
        </div>
      </mat-card>
    </div>
  `
})
export class SeriesVisualizationComponent implements OnInit {
  @Input()
  series: boolean[] = [];
  showPanel: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
  }
}
