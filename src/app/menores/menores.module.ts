import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenorComponent } from './menor/menor.component';
import { ListadoComponent } from './listado/listado.component';
import { HomeComponent } from './home/home.component';
import { MenoresRoutingModule } from './menores-routing.module';
import { AngularMaterialModule } from '../components/shared/angular-material/angular-material.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenorComponent,
    ListadoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MenoresRoutingModule,
    AngularMaterialModule,
    DashboardModule,
    FormsModule
  ],
  exports:[
    ListadoComponent,
    MenorComponent
  ]
})
export class MenoresModule { }
