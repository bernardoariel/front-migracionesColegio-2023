import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { AutorizanteComponent } from './autorizante/autorizante.component';
import { AutorizantesRoutingModule } from './autorizantes-routing.module';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoComponent,
    AutorizanteComponent
  ],
  imports: [
    CommonModule,
    AutorizantesRoutingModule,
    AngularMaterialModule,
    DashboardModule,
    FormsModule
  ],
  exports:[
    ListadoComponent,
    AutorizanteComponent
  ]
})
export class AutorizantesModule { }
