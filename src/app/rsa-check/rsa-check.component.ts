import {Component, OnInit} from '@angular/core';
import {UploadedFile} from "../upload-file/upload-file.component";
import {BackendCommunicationService, RsaRequest} from "../services/backend-communication.service";

@Component({
  selector: 'app-rsa-check',
  styleUrls: ['./rsa-check.component.scss'],
  template: `
    <mat-card>
      <mat-card class="result-panel"
                [ngClass]="{'correct-message': correctMessage(), 'incorrect-message': incorrectMessage()}"
                *ngIf="chowCallOperationButton() || resultVisible()">
        <button mat-raised-button
                *ngIf="chowCallOperationButton()"
                color="primary"
                (click)="callOperation()">
          Sprawdź czy wiadomość jest zgodna z podpisem
        </button>
        <div class="result"
             *ngIf="resultVisible()"
        >{{operationResultMessage}}
        </div>
      </mat-card>

      <mat-card class="panel inputs">
        <mat-form-field appearance="fill">
          <mat-label>Parametr e klucza publicznego nadawcy wiadomości</mat-label>
          <input matInput
                 [(ngModel)]="eParamPublic"
                 (focus)="hideResult()"
                 placeholder="Parametr e do szyfrowania - kluczem publiczny"
          >
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Parametr n wspólny</mat-label>
          <input matInput
                 (focus)="hideResult()"
                 [(ngModel)]="nParamCommon"
                 placeholder="Parametr n wspólny do szyfrowania/odszyforwania">
        </mat-form-field>
      </mat-card>

      <mat-card class="panel">
        <app-upload-file
          [buttonLabel]="'Wgraj plik z wiadomoscia'"
          (uploadedFile)="onUploadedMessageFile($event); hideResult()"
        ></app-upload-file>
        <div class="file-content" *ngIf="messageFileUploaded()">
          Plik: {{messageFileName}}<br><br>
          zawartość: <br><br>
          {{message}}
        </div>
      </mat-card>
      <mat-card class="panel">
        <app-upload-file
          [buttonLabel]="'Wgraj plik z podpisem'"
          (uploadedFile)="onUploadedSignatureFile($event); hideResult()"
        ></app-upload-file>
        <div class="file-content" *ngIf="signatureFileUploaded()">
          Plik: {{signatureFileName}}<br><br>
          zawartość: <br><br>
          {{signature}}
        </div>
      </mat-card>
      przykladowe klucze: ePublicznyNadawcy = 7, dPrywatnyNadawcy = 463, n = 589 <br>
      przykladowe klucze: ePublicznyNadawcy = 3, dPrywatnyNadawcy = 427, n = 697 <br>
    </mat-card>
  `
})
export class RsaCheckComponent implements OnInit {
  private static CORRECT_MESSAGE = 'Wiadomość zgodna z podpisem (nienaruszona) :)';
  private static INCORRECT_MESSAGE = 'Wiadomość niezgodna z podpisem (zmieniona) :(';
  message: string = '';
  messageFileName: string = '';
  signature: string = '';
  signatureFileName: string = '';
  eParamPublic: string = ''
  nParamCommon: string = ''
  operationResultMessage: string = ''

  constructor(private backendService: BackendCommunicationService) {
  }

  ngOnInit(): void {
  }

  onUploadedMessageFile(uploadedFile: UploadedFile): void {
    this.message = uploadedFile.content;
    this.messageFileName = uploadedFile.name;
  }

  onUploadedSignatureFile(uploadedFile: UploadedFile): void {
    this.signature = uploadedFile.content;
    this.signatureFileName = uploadedFile.name;
  }

  messageFileUploaded(): boolean {
    return this.message !== '';
  }

  signatureFileUploaded(): boolean {
    return this.signature !== '';
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
    this.signature = '';
    this.signatureFileName = '';
    this.nParamCommon = '';
    this.eParamPublic = '';
    this.hideResult();
  }

  callOperation(): void {
    const request: RsaRequest = {
      message: this.signature,
      nParamCommon: this.nParamCommon,
      dParamPrivate: this.eParamPublic,
      eParamPublic: '',
    }
    const message: string = this.message;
    this.clearState();
    this.decrypt(request, message);
  }

  decrypt(request: RsaRequest, message: string): void {
    this.backendService.decryptRsa(request).subscribe(response => {
      if (response.message === message) {
        this.operationResultMessage = RsaCheckComponent.CORRECT_MESSAGE;
      } else {
        this.operationResultMessage = RsaCheckComponent.INCORRECT_MESSAGE;
      }
    });
  }

  correctMessage(): boolean {
    return this.operationResultMessage === RsaCheckComponent.CORRECT_MESSAGE;
  }

  incorrectMessage(): boolean {
    return this.operationResultMessage === RsaCheckComponent.INCORRECT_MESSAGE;
  }

  chowCallOperationButton(): boolean {
    return this.message !== '' &&
      this.signature !== '' &&
      this.nParamCommon !== '' &&
      this.eParamPublic !== '' &&
      this.nParamCommon !== '';
  }
}
