import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <mat-toolbar>
      <mat-tab-group>
        <mat-tab label="Generator BBS 20k"></mat-tab>
      </mat-tab-group>
    </mat-toolbar>
    <app-generate-bbs></app-generate-bbs>
  `
})
export class AppComponent {
  title = 'laboratorium-podstawy-kryptografii-front';
}
