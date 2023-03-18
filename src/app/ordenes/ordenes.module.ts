import { OrdenesRoutingModule } from './ordenes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { OrdenComponent } from './orden/orden.component';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoComponent,
    OrdenComponent
  ],
  imports: [
    CommonModule,
    OrdenesRoutingModule,
    AngularMaterialModule,
    DashboardModule,
    FormsModule
  ],
  exports: [
    OrdenComponent
  ]
})
export class OrdenesModule { }
