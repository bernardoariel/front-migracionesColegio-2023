import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { ProgenitorComponent } from './progenitor/progenitor.component';
import { ProgenitoresRoutingModule } from './progenitores-routing.module';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoComponent,
    ProgenitorComponent
  ],
  imports: [
    CommonModule,
    ProgenitoresRoutingModule,
    AngularMaterialModule,
    DashboardModule,
    FormsModule
  ],
  exports:[
    ListadoComponent,
    ProgenitorComponent
  ]
})
export class ProgenitoresModule { }
