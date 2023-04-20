import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenorRoutingModule } from './menor-routing.module';
import { MenorComponent } from './menor/menor.component';
import { ListaComponent } from './lista/lista.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    MenorComponent,
    ListaComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MenorRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    MenorComponent,
    ListaComponent,
    ConfirmComponent
  ]
})
export class MenorModule { }
