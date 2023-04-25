import { MenorModule } from './menor/menor.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { LoginModule } from './login/login.module';
import { EscribanosModule } from './escribanos/escribanos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VideosComponent } from './components/shared/videos/videos.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';




@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LoginModule,
    EscribanosModule,
    DashboardModule,
    MenorModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' } // Usa 'es-AR' para el formato de fecha dd-mm-yyyy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
