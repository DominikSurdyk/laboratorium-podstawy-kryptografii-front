import {Component, OnInit} from '@angular/core';
import {BackendCommunicationService, RsaRequest} from "../services/backend-communication.service";
import {UploadedFile} from "../upload-file/upload-file.component";

@Component({
  selector: 'app-rsa',
  styleUrls: ['./rsa.component.scss'],
  template: `
    <mat-card>
      <mat-card class="result-panel" *ngIf="chowCallOperationButton() || resultVisible()">
        <button mat-raised-button
                *ngIf="chowCallOperationButton()"
                color="primary"
                (click)="callOperation()">
          {{operationName(selectedOperation)}} algorytmem RSA
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

      <mat-card class="panel inputs">
        <mat-form-field appearance="fill" *ngIf="publicParamVisible">
          <mat-label>Parametr e Publiczny</mat-label>
          <input matInput
                 [(ngModel)]="eParamPublic"
                 (focus)="hideResult()"
                 placeholder="Parametr e do szyfrowania - kluczem publiczny"
          >
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Parametr d Prywatny</mat-label>
          <input matInput
                 (focus)="hideResult()"
                 [(ngModel)]="dParamPrivate"
                 placeholder="Parametr d do odszyfrowania - kluczem prywatnym">
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
          [buttonLabel]="'Wgraj plik z wiadomością'"
          (uploadedFile)="onUploadedMessageFile($event); hideResult()"
        ></app-upload-file>
        <div class="file-content" *ngIf="messageFileUploaded()">
          Plik: {{messageFileName}}<br><br>
          zawartość: <br><br>
          {{message}}
        </div>
      </mat-card>
      przykladowe klucze: ePublicznyNadawcy = 7, dPrywatnyNadawcy = 463, n = 589 <br>
      przykladowe klucze: ePublicznyNadawcy = 3, dPrywatnyNadawcy = 427, n = 697 <br>
    </mat-card>
  `
})
export class RsaComponent implements OnInit {
  private static readonly ENCRYPTION = 'ENCRYPTION';
  private static readonly DECRYPTION = 'DECRYPTION';


  operations: string[] = [RsaComponent.ENCRYPTION, RsaComponent.DECRYPTION]

  message: string = '';
  messageFileName: string = '';
  selectedOperation: string = ''
  eParamPublic: string = ''
  dParamPrivate: string = ''
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

  messageFileUploaded(): boolean {
    return this.message !== '';
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
    this.nParamCommon = '';
    this.dParamPrivate = '';
    this.nParamCommon = '';
    this.selectedOperation = ''
    this.hideResult();
  }

  chowCallOperationButton(): boolean {
    return this.message !== '' &&
      this.selectedOperation !== '' &&
      this.nParamCommon !== '' &&
      this.conditionsForDecrypt() &&
      this.conditionsForEncrypt();
  }

  conditionsForEncrypt() : boolean {
    if (this.selectedOperation !== RsaComponent.ENCRYPTION){
      return true
    }
    return this.eParamPublic !== '';
  }

  conditionsForDecrypt() : boolean {
    if (this.selectedOperation !== RsaComponent.DECRYPTION){
      return true
    }
    return this.dParamPrivate !== '';
  }

  resetFile(): void {
    this.messageFileName = '';
    this.message = '';
  }

  operationName(operation: string): string {
    if (operation === RsaComponent.ENCRYPTION) {
      return "Zaszyfruj";
    } else if ((operation === RsaComponent.DECRYPTION)) {
      return "Odszyfruj";
    } else return "parsuj";
  }

  encrypt(request: RsaRequest): void {
    this.backendService.encryptRsa(request).subscribe(response => {
      this.operationResultMessage = response.message
    });
  }

  decrypt(request: RsaRequest): void {
    this.backendService.decryptRsa(request).subscribe(response => {
      this.operationResultMessage = response.message
    });
  }

  get publicParamVisible() : boolean {
    return this.selectedOperation === RsaComponent.ENCRYPTION;
  }

  callOperation(): void {
    const request: RsaRequest = {
      message: this.message,
      nParamCommon: this.nParamCommon,
      dParamPrivate: this.dParamPrivate,
      eParamPublic: this.eParamPublic,
    }
    const operation: string = this.selectedOperation;
    this.clearState();
    if (operation === RsaComponent.ENCRYPTION) {
      this.encrypt(request)
    } else {
      this.decrypt(request);
    }
  }

}
