import { ProgenitorComponent } from './progenitor/progenitor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';

const rutas: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado',
        component: ListadoComponent,
        pathMatch:'full'
      },
      {
        path:'agregar',
        component: ProgenitorComponent,
        pathMatch:'full'
      },
      {
        path:'editar/:id',
        component: ProgenitorComponent,
        pathMatch:'full'
      },
      {
        path: '**',
        redirectTo: 'progenitores/listado'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports:[
    RouterModule
  ]
})
export class ProgenitoresRoutingModule { }
