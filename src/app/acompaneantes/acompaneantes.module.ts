import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompaneantesRoutingModule } from './acompaneantes-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { AcompaneanteComponent } from './acompaneante/acompaneante.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListadoComponent,
    AcompaneanteComponent,

  ],
  imports: [
    CommonModule,
    AcompaneantesRoutingModule,
     AngularMaterialModule,
    DashboardModule,
    FormsModule
  ],
  exports:[
    ListadoComponent,
    AcompaneanteComponent
  ]
})
export class AcompaneantesModule { }
