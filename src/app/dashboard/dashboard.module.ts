import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PrincipalComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports:[
    PrincipalComponent
  ]
})
export class DashboardModule { }
