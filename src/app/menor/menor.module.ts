import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenorRoutingModule } from './menor-routing.module';
import { MenorComponent } from './menor/menor.component';
import { ListaComponent } from './lista/lista.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';


@NgModule({
  declarations: [
    MenorComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    MenorRoutingModule,
    AngularMaterialModule
  ]
})
export class MenorModule { }
