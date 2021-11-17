import {Component, ViewChild} from '@angular/core';
import {DecryptionComponent} from "./decryption/decryption.component";
import {EncryptionComponent} from "./encryption/encryption.component";
import {GenerateBbsComponent} from "./generate-bbs/generate-bbs.component";
import {UploadBbsComponent} from "./upload-bbs/upload-bbs.component";
import {AesEncryptionComponent} from "./aes-encryption/aes-encryption.component";

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <mat-tab-group (selectedIndexChange)="choose($event)">
      <mat-tab label="Generator Szyfrów BBS" [tabIndex]="0">
        <app-generate-bbs></app-generate-bbs>
      </mat-tab>
      <mat-tab label="Upload plików z BBS" [tabIndex]="1">
        <app-upload-bbs></app-upload-bbs>
      </mat-tab>
      <mat-tab label="Szyfrowanie wiadomości" [tabIndex]="2">
        <app-encryption></app-encryption>
      </mat-tab>
      <mat-tab label="Odszyfrowanie wiadomości" [tabIndex]="3">
        <app-decryption></app-decryption>
      </mat-tab>
      <mat-tab label="AES szyfrowanie wiadomości" [tabIndex]="4">
        <app-ecb-encode></app-ecb-encode>
      </mat-tab>
    </mat-tab-group>

  `
})
export class AppComponent {
  title = 'laboratorium-podstawy-kryptografii-front';
  readonly GENERATE_BBS = 0;
  readonly UPLOAD_BBS = 1;
  readonly ENCRYPTION = 2;
  readonly DECRYPTION = 3;
  readonly AES_ENCRYPTION = 4;
  readonly AES_DECRYPTION = 5;
  @ViewChild(DecryptionComponent)
  decryptionComponent: DecryptionComponent;
  @ViewChild(EncryptionComponent)
  encryptionComponent: EncryptionComponent;
  @ViewChild(GenerateBbsComponent)
  generateBbsComponent: GenerateBbsComponent;
  @ViewChild(UploadBbsComponent)
  uploadBbsComponent: UploadBbsComponent;
  @ViewChild(AesEncryptionComponent)
  aesEncodeComponent: AesEncryptionComponent;

  constructor() {
  }

  choose(componentIndex: number): void {
    if (componentIndex !== this.DECRYPTION) {
      this.decryptionComponent.clearState();
    }
    if (componentIndex !== this.ENCRYPTION) {
      this.encryptionComponent.clearState();
    }
    if (componentIndex !== this.GENERATE_BBS) {
      this.generateBbsComponent.clearState();
    }
    if (componentIndex !== this.UPLOAD_BBS) {
      this.uploadBbsComponent.clearState();
    }
    if (componentIndex !== this.AES_ENCRYPTION) {
      this.aesEncodeComponent.clearState();
    }
  }
}
