import { OrdenesModule } from './../ordenes/ordenes.module';
import { ProgenitoresModule } from './../progenitores/progenitores.module';
import { AutorizantesModule } from './../autorizantes/autorizantes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './crear/crear.component';
import { PrecargasRoutingModule } from './precargas-routing.module';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MenoresModule } from '../menores/menores.module';
import { FormsModule } from '@angular/forms';
import { AcompaneantesModule } from '../acompaneantes/acompaneantes.module';

@NgModule({
  declarations: [
    CrearComponent,
  ],
  imports: [
    CommonModule,
    PrecargasRoutingModule,
    AngularMaterialModule,
    DashboardModule,
    MenoresModule,
    AutorizantesModule,
    ProgenitoresModule,
    OrdenesModule,
    FormsModule,
    AcompaneantesModule

  ],

})
export class PrecargasModule { }
