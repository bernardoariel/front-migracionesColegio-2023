import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompaneanteRoutingModule } from './acompaneante-routing.module';
import { AcompaneanteComponent } from './acompaneante/acompaneante.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ListaComponent } from './lista/lista.component';
import { PipesModule } from '../pipes/pipes.module';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcompaneanteComponent,
    ConfirmComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    AcompaneanteRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    AcompaneanteComponent,
    ConfirmComponent,
    ListaComponent,
  ]
})
export class AcompaneanteModule { }
