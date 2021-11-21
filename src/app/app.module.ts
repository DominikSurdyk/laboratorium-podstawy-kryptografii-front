import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GenerateBbsComponent} from './generate-bbs/generate-bbs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {SeriesVisualizationComponent} from './series-visualization/series-visualization.component';
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BoolToStringPipe} from './pipes/bool-to-string.pipe';
import {StringToBoolPipe} from './pipes/string-to-bool.pipe';
import {UploadBbsComponent} from './upload-bbs/upload-bbs.component';
import {TestingComponent} from './testing/testing.component';
import { EncryptionComponent } from './encryption/encryption.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DecryptionComponent } from './decryption/decryption.component';
import { AesEncryptionComponent } from './aes-encryption/aes-encryption.component';
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import { AesDecryptionComponent } from './aes-decryption/aes-decryption.component';
import { RsaComponent } from './rsa/rsa.component';
import { RsaCheckComponent } from './rsa-check/rsa-check.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerateBbsComponent,
    SeriesVisualizationComponent,
    BoolToStringPipe,
    StringToBoolPipe,
    UploadBbsComponent,
    TestingComponent,
    EncryptionComponent,
    UploadFileComponent,
    DecryptionComponent,
    AesEncryptionComponent,
    AesDecryptionComponent,
    RsaComponent,
    RsaCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
