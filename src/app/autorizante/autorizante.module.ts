import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizanteRoutingModule } from './autorizante-routing.module';
import { AutorizanteComponent } from './autorizante/autorizante.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ListaComponent } from './lista/lista.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    AutorizanteComponent,
    ConfirmComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    AutorizanteRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    AutorizanteComponent,
    ConfirmComponent,
    ListaComponent,
  ]
})
export class AutorizanteModule { }
