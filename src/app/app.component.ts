import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
      <mat-tab-group>
        <mat-tab label="Generator BBS 20k">
          <app-generate-bbs></app-generate-bbs>
        </mat-tab>
        <mat-tab label="Upload plików">
          <app-upload-bbs></app-upload-bbs>
        </mat-tab>
      </mat-tab-group>

  `
})
export class AppComponent {
  title = 'laboratorium-podstawy-kryptografii-front';
}
