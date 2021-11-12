import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
      <mat-tab-group>
        <mat-tab label="Generator Szyfrów BBS">
          <app-generate-bbs></app-generate-bbs>
        </mat-tab>
        <mat-tab label="Upload plików z BBS">
          <app-upload-bbs></app-upload-bbs>
        </mat-tab>
        <mat-tab label="Szyfrowanie wiadomości">
          <app-encryption></app-encryption>
        </mat-tab>
      </mat-tab-group>

  `
})
export class AppComponent {
  title = 'laboratorium-podstawy-kryptografii-front';
}
