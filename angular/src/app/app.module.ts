import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import {
    MatListModule, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatProgressSpinnerModule, MatInputModule, MatDialogModule
} from '@angular/material';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }
