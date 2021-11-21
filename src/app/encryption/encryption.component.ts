import {Component, OnInit} from '@angular/core';
import {BackendCommunicationService, EncryptBbsRequest} from "../services/backend-communication.service";
import {ParsingService} from "../services/parsing.service";
import {UploadedFile} from "../upload-file/upload-file.component";

@Component({
  selector: 'app-encryption',
  styleUrls: ['./encryption.component.scss'],
  template: `
    <mat-card class="container">
      <mat-card class="result-panel"
                *ngIf="filesUploaded">
        <button mat-raised-button color="primary"
                *ngIf="isKeyLongEnoughForString()"
                (click)="encryptString()">
          Zakoduj text
        </button>
        <button mat-raised-button color="primary"
                *ngIf="isKeyLongEnoughForAscii()"
                (click)="encryptAscii()">
          Zakoduj ciąg bitów
        </button>
      </mat-card>
      <mat-card class="file-panel">
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
export class EncryptionComponent implements OnInit {
  static readonly ASCII_DIGIT_LENGTH: number = 8;
  message: string = '';
  messageWithoutWraps: string = '';
  messageFileName: string = '';
  key: string = '';
  keyFileName: string = '';


  constructor(private backendService: BackendCommunicationService,
              private parsingService: ParsingService) {
  }

  get filesUploaded(): boolean {
    return this.messageFileUploaded() && this.keyFileUploaded();
  }

  messageFileUploaded(): boolean {
    return this.message !== '';
  }

  keyFileUploaded(): boolean {
    return this.key !== '';
  }

  ngOnInit(): void {
  }

  onUploadedMessageFile(uploadedFile: UploadedFile): void {
    console.log(uploadedFile.content.length)
    this.message = uploadedFile.content;
    this.messageWithoutWraps = uploadedFile.content.replace(/(\r\n|\n|\r)/gm, "");
    console.log(this.messageWithoutWraps.length)
    this.messageFileName = uploadedFile.name;
  }

  onUploadKeyFile(uploadedFile: UploadedFile): void {
    this.key = uploadedFile.content;
    this.keyFileName = uploadedFile.name;
  }

  isKeyLongEnoughForString(): boolean {
    return this.messageWithoutWraps.length <= this.key.length;
  }

  isKeyLongEnoughForAscii(): boolean {
    return this.messageWithoutWraps.length <= this.key.length;
  }

  encryptString(): void {
    const request: EncryptBbsRequest = {
      messageAscii: [],
      messageString: this.messageWithoutWraps,
      messageFileName: this.parsingService.parseFilename(this.messageFileName),
      key: this.parsingService.toBooleanArray(this.key),
      keyFileName: this.parsingService.parseFilename(this.keyFileName)
    }
    this.backendService.encryptStringMessage(request).subscribe((res) => {
      console.log(res)
      this.clearState();
    })
  }

  encryptAscii(): void {
    const request: EncryptBbsRequest = {
      messageAscii: this.parsingService.toBooleanArray(this.messageWithoutWraps),
      messageString: '',
      messageFileName: this.parsingService.parseFilename(this.messageFileName),
      key: this.parsingService.toBooleanArray(this.key),
      keyFileName: this.parsingService.parseFilename(this.keyFileName)
    }
    this.backendService.encryptAsciiMessage(request).subscribe((res) => {
      console.log(res)
      this.clearState();
    })
  }

  clearState(): void {
    this.key = '';
    this.keyFileName = '';
    this.message = '';
    this.messageFileName = '';
  }
}
