import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { ListaComponent } from './lista/lista.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { MenorModule } from '../menor/menor.module';
import { MenoresModule } from "../menores/menores.module";


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
  ]
})
export class SolicitudModule { }
