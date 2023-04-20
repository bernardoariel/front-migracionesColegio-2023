import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// import { FechaBDPipe } from './pipes/fecha-bd.pipe';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { LoginModule } from './login/login.module';
import { EscribanosModule } from './escribanos/escribanos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VideosComponent } from './components/shared/videos/videos.component';
// import { ControlErrorPipe } from './pipes/control-error.pipe';










@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    // ControlErrorPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LoginModule,
    EscribanosModule,
    DashboardModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
