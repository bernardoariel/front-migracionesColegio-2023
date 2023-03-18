
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { EscribanoComponent } from './escribano/escribano.component';
import { HomeComponent } from './home/home.component';
import { EscribanosRoutingModule } from './escribanos-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { PassComponent } from './pass/pass.component';



@NgModule({
  declarations: [
    ListadoComponent,
    EscribanoComponent,
    HomeComponent,
    PassComponent,
  ],
  imports: [
    CommonModule,
    EscribanosRoutingModule,
    AngularMaterialModule,
    DashboardModule,
    FormsModule
  ]
})
export class EscribanosModule { }
