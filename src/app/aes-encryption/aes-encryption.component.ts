import {Component, OnInit} from '@angular/core';
import {UploadedFile} from "../upload-file/upload-file.component";
import {MatRadioChange} from "@angular/material/radio";
import {AesEncryptRequest, BackendCommunicationService} from "../services/backend-communication.service";

@Component({
  selector: 'app-ecb-encode',
  styleUrls: ['./aes-encryption.component.scss'],
  template: `
    <mat-card>
      <mat-card class="result-panel" *ngIf="showEncryptButton()">
        <button mat-raised-button color="primary"
                (click)="encrypt()">
          ZASZYFRUJ ALGORYTMEM {{selectedMode}}
        </button>
      </mat-card>
      <mat-card class="panel">
        <mat-radio-group class="radio-group" [(ngModel)]="selectedMode">
          <mat-radio-button *ngFor="let mode of modes"
                            class="radio"
                            value="{{mode}}"
          >{{mode}}</mat-radio-button>
        </mat-radio-group>
      </mat-card>
      <mat-card class="panel inputs">
        <mat-form-field appearance="fill">
          <mat-label>Sekret</mat-label>
          <input matInput [(ngModel)]="secret">
        </mat-form-field>
        <mat-form-field appearance="fill" *ngIf="initialVectorNecessary()">
          <mat-label>Wektor inicjujący</mat-label>
          <input matInput [(ngModel)]="initialVector" placeholder="Wymagane 16 znaków. Wszystko powyzej jest ucinane">
        </mat-form-field>
      </mat-card>
      <mat-card class="panel">
        <app-upload-file
          [buttonLabel]="'Wgraj plik z wiadomością'"
          (uploadedFile)="onUploadedMessageFile($event)"
        ></app-upload-file>
        <div class="file-content" *ngIf="messageFileUploaded()">
          Plik: {{messageFileName}}<br><br>
          zawartość: <br>
          {{message}}
        </div>
      </mat-card>
    </mat-card>
  `
})
export class AesEncryptionComponent implements OnInit {
  private static readonly ECB = 'ECB';
  private static readonly CBC = 'CBC';
  private static readonly PBC = 'PBC';

  modes: string[] = [AesEncryptionComponent.ECB, AesEncryptionComponent.CBC, AesEncryptionComponent.PBC]
  message: string = '';
  messageFileName: string = '';
  selectedMode: string = '';
  secret: string = '';
  initialVector: string = '';


  constructor(private backendService: BackendCommunicationService) {
  }

  ngOnInit(): void {
  }


  onUploadedMessageFile(uploadedFile: UploadedFile): void {
    this.message = uploadedFile.content;
    this.messageFileName = uploadedFile.name;
  }

  messageFileUploaded(): boolean {
    return this.message !== '';
  }


  public clearState(): void {
    this.message = '';
    this.messageFileName = '';
    this.selectedMode = '';
    this.secret = '';
    this.initialVector = '';
  }

  selectMode(mode: MatRadioChange): void {
    this.selectedMode = mode.value;
  }

  initialVectorNecessary(): boolean {
    return this.selectedMode ===
      AesEncryptionComponent.CBC || this.selectedMode === AesEncryptionComponent.PBC
  }

  filledInitialVectorIfNecessary(): boolean {
    return this.initialVectorNecessary() && this.initialVector.length >= 16
      || !this.initialVectorNecessary();
  }

  showEncryptButton(): boolean {
    return this.message !== '' &&
      this.selectedMode !== '' &&
      this.secret !== '' &&
      this.filledInitialVectorIfNecessary();

  }

  setSecret(secret: string) {
    this.secret = secret;
  }

  setInitialVector(initialVector: string) {
    this.initialVector = initialVector;
  }

  encrypt(): void {
    const request: AesEncryptRequest = {
      message: this.message,
      secret: this.secret,
      initVector: this.initialVector.substr(0,16)
    }
    if (this.selectedMode === AesEncryptionComponent.ECB) {
      this.backendService.encryptEbc(request).subscribe();
    } else if (this.selectedMode == AesEncryptionComponent.CBC) {
      this.backendService.encryptCbc(request).subscribe();
    } else {
      this.backendService.encryptPbc(request).subscribe();
    }
    this.clearState();
  }
}
