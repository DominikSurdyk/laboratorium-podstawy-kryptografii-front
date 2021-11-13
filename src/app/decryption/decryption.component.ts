import { Component, OnInit } from '@angular/core';
import {BackendCommunicationService, EncryptRequest} from "../services/backend-communication.service";
import {ParsingService} from "../services/parsing.service";
import {UploadedFile} from "../upload-file/upload-file.component";

@Component({
  selector: 'app-decryption',
  styleUrls: ['./decryption.component.scss'],
  template: `
    <mat-card class="container">
      <mat-card class="result-panel"
                *ngIf="filesUploaded">
        <button mat-raised-button color="primary"
                *ngIf="isKeyLongEnoughForAscii()"
                (click)="decryptToString()">
          Odkoduj do textu
        </button>
        <div class="result-container">
          {{result}}
        </div>
      </mat-card>
    <mat-card class="file-panel">
      <app-upload-file
        [buttonLabel]="'Wgraj plik z zakodowaną wiadomością'"
        (uploadedFile)="onUploadedMessageFile($event)"
      ></app-upload-file>
      <div class="file-content" *ngIf="messageFileUploaded()">
        Plik: {{messageFileName}}<br><br>
        zawartość: <br>
        {{message}}
      </div>
    </mat-card>
    <mat-card class="file-panel">
      <app-upload-file
        [buttonLabel]="'Wgraj plik z kluczem'"
        (uploadedFile)="onUploadKeyFile($event)"
      ></app-upload-file>
      <div class="file-content" *ngIf="keyFileUploaded()">
        Plik: {{keyFileName}},<br><br>
        zawartość: <br>
        {{key}}
      </div>
    </mat-card>
  </mat-card>
  `
})
export class DecryptionComponent implements OnInit {
  message: string = '';
  messageFileName: string = '';
  key: string = '';
  keyFileName: string = '';
  result: string ='';

  constructor(private backendService: BackendCommunicationService,
              private parsingService: ParsingService) { }

  get filesUploaded(): boolean {
    return this.messageFileUploaded() && this.keyFileUploaded();
  }

  ngOnInit(): void {
  }

  messageFileUploaded(): boolean {
    return this.message !== '';
  }

  keyFileUploaded(): boolean {
    return this.key !== '';
  }


  onUploadedMessageFile(uploadedFile: UploadedFile): void {
    this.message = uploadedFile.content;
    this.messageFileName = uploadedFile.name;
  }

  onUploadKeyFile(uploadedFile: UploadedFile): void {
    this.key = uploadedFile.content;
    this.keyFileName = uploadedFile.name;
  }

  isKeyLongEnoughForAscii(): boolean {
    return this.message.length <= this.key.length;
  }

  decryptToString(): void {
    const request: EncryptRequest = {
      messageAscii: this.parsingService.toBooleanArray(this.message),
      messageString: '',
      messageFileName: this.parsingService.parseFilename(this.messageFileName),
      key: this.parsingService.toBooleanArray(this.key),
      keyFileName: this.parsingService.parseFilename(this.keyFileName)
    }
    this.backendService.decryptMessageToString(request).subscribe((res: string) => {
      this.result = res
    })
  }


  clearState(): void {
    this.key = '';
    this.keyFileName = '';
    this.message = '';
    this.messageFileName = '';
  }

  clearResult(): void {
    this.result = '';
  }
}
