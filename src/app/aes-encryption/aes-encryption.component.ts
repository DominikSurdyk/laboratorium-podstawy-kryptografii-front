import {Component, OnInit} from '@angular/core';
import {UploadedFile} from "../upload-file/upload-file.component";
import {MatRadioChange} from "@angular/material/radio";
import {AesEncryptRequest, BackendCommunicationService} from "../services/backend-communication.service";

@Component({
  selector: 'app-ecb-encode',
  styleUrls: ['./aes-encryption.component.scss'],
  template: `
    <mat-card>
      <mat-card class="result-panel" *ngIf="showEncryptButton() || resultVisible()">
        <button mat-raised-button
                *ngIf="showEncryptButton()"
                color="primary"
                (click)="callOperation()">
          {{operationName(selectedOperation)}} algorytmem {{selectedMode}}
        </button>
        <div class="result" *ngIf="resultVisible()">
          {{operationResultMessage}}
        </div>
      </mat-card>

      <mat-card class="panel">
        <mat-radio-group class="radio-group" [(ngModel)]="selectedOperation" (change)="resetFile(); hideResult()">
          <mat-radio-button *ngFor="let operation of operations"
                            class="radio"
                            value="{{operation}}"
          >{{operationName(operation)}}</mat-radio-button>
        </mat-radio-group>
      </mat-card>
      <mat-card class="panel">
        <mat-radio-group class="radio-group" [(ngModel)]="selectedMode" (change)="hideResult()">
          <mat-radio-button *ngFor="let mode of modes"
                            class="radio"
                            value="{{mode}}"
          >{{mode}}</mat-radio-button>
        </mat-radio-group>
      </mat-card>
      <mat-card class="panel inputs">
        <mat-form-field appearance="fill">
          <mat-label>Sekret</mat-label>
          <input matInput
                 [(ngModel)]="secret"
                 (focus)="hideResult()"
          >
        </mat-form-field>
        <mat-form-field appearance="fill" *ngIf="initialVectorNecessary()">
          <mat-label>Wektor inicjujący</mat-label>
          <input matInput
                 (focus)="hideResult()"
                 [(ngModel)]="initialVector"
                 placeholder="Wymagane 16 znaków. Wszystko powyzej jest ucinane">
        </mat-form-field>
      </mat-card>
      <mat-card class="panel">
        <app-upload-file
          [buttonLabel]="'Wgraj plik z wiadomością'"
          (uploadedFile)="onUploadedMessageFile($event); hideResult()"
        ></app-upload-file>
        <div class="file-content" *ngIf="messageFileUploaded()">
          Plik: {{messageFileName}}<br><br>
          zawartość: <br><br>
          <span *ngFor="let block of messageBlocks(); let i = index"
                [ngClass]="{ 'even': evenNumber(i), 'odd': oddNumber(i) }"
          >{{block}}</span>
        </div>
      </mat-card>
    </mat-card>
  `
})
export class AesEncryptionComponent implements OnInit {
  private static readonly ECB = 'ECB';
  private static readonly CBC = 'CBC';
  private static readonly PBC = 'PBC';

  private static readonly ENCRYPTION = 'ENCRYPTION';
  private static readonly DECRYPTION = 'DECRYPTION';


  modes: string[] = [AesEncryptionComponent.ECB, AesEncryptionComponent.CBC, AesEncryptionComponent.PBC]
  operations: string[] = [AesEncryptionComponent.ENCRYPTION, AesEncryptionComponent.DECRYPTION]

  message: string = '';
  messageFileName: string = '';
  selectedMode: string = '';
  selectedOperation: string = ''
  secret: string = '';
  initialVector: string = '';
  operationResultMessage: string = ''


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

  messageBlocks(): string[] {
    let blockSize: number;
    if (this.selectedOperation === AesEncryptionComponent.ENCRYPTION) {
      blockSize = 16;
    } else {
      blockSize = 128;
    }
    const result: string[] = [];
    for (let i = 0; i < this.message.length; i = i + blockSize) {
      result.push(this.message.substr(i, blockSize));
    }
    return result;
  }

  hideResult(): void {
    this.operationResultMessage = '';
  }

  resultVisible(): boolean {
    return this.operationResultMessage !== '';
  }


  public clearState(): void {
    this.message = '';
    this.messageFileName = '';
    this.selectedMode = '';
    this.secret = '';
    this.initialVector = '';
    this.selectedOperation = ''
    this.hideResult();
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
      this.selectedOperation !== '' &&
      this.filledInitialVectorIfNecessary();
  }

  setSecret(secret: string) {
    this.secret = secret;
  }

  setInitialVector(initialVector: string) {
    this.initialVector = initialVector;
  }

  callOperation(): void {
    const request: AesEncryptRequest = {
      message: this.message,
      secret: this.secret,
      initVector: this.initialVector.substr(0, 16)
    }
    const mode: string = this.selectedMode;
    const operation: string = this.selectedOperation;
    this.clearState();
    if (operation === AesEncryptionComponent.ENCRYPTION) {
      this.encrypt(mode, request)
    } else {
      this.decrypt(mode, request);
    }
  }

  encrypt(mode: string, request: AesEncryptRequest): void {
    if (mode === AesEncryptionComponent.ECB) {
      this.backendService.encryptEcb(request).subscribe(response => {
        this.operationResultMessage = response.message
      });
    } else if (mode == AesEncryptionComponent.CBC) {
      this.backendService.encryptCbc(request).subscribe(response => {
        this.operationResultMessage = response.message
      });
    } else {
      this.backendService.encryptPbc(request).subscribe(response => {
        this.operationResultMessage = response.message
      });
    }
  }

  decrypt(mode: string, request: AesEncryptRequest): void {
    if (mode === AesEncryptionComponent.ECB) {
      this.backendService.decryptEcb(request).subscribe(response => {
        this.operationResultMessage = response.message
      });
    } else if (mode == AesEncryptionComponent.CBC) {
      this.backendService.decryptCbc(request).subscribe(response => {
        this.operationResultMessage = response.message
      });
    } else {
      this.backendService.decryptPbc(request).subscribe(response => {
        this.operationResultMessage = response.message
      });
    }
  }

  resetFile(): void {
    this.messageFileName = '';
    this.message = '';
  }

  operationName(operation: string): string {
    if (operation === AesEncryptionComponent.ENCRYPTION) {
      return "Zaszyfruj";
    } else if ((operation === AesEncryptionComponent.DECRYPTION)) {
      return "Odszyfruj";
    } else return "parsuj";
  }

  evenNumber(num: number) {
    if (this.selectedOperation === ''){
      return false;
    }
    return num % 2 === 0;
  }

  oddNumber(num: number) {
    if (this.selectedOperation === ''){
      return false;
    }
    return num % 2 === 1;
  }
}
