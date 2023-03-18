import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';




@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    DashboardModule
  ],
  exports:[
    LoginComponent
  ]

})
export class LoginModule { }
