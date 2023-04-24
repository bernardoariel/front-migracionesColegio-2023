import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { ListaComponent } from './lista/lista.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { MenorModule } from '../menor/menor.module';
import { AutorizanteModule } from '../autorizante/autorizante.module';
import { AcompaneanteModule } from '../acompaneante/acompaneante.module';
import { OrdenesModule } from '../ordenes/ordenes.module';
import { OrdenModule } from '../orden/orden.module';




@NgModule({
  declarations: [
    SolicitudComponent,
    ListaComponent,
    ConfirmComponent
  ],
  exports: [
    SolicitudComponent,
    ListaComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    AngularMaterialModule,
    MenorModule,
    AutorizanteModule,
    FormsModule,
    AcompaneanteModule,
    OrdenesModule,
    OrdenModule
  ]
})
export class SolicitudModule { }
