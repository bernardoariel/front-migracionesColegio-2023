import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenComponent } from './orden/orden.component';
import { ListaComponent } from './lista/lista.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrdenComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    PipesModule
  ],
  exports:[
    OrdenComponent,
  ]
})
export class OrdenModule { }
