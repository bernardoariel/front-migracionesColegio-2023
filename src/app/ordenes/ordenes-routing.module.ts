import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { OrdenComponent } from './orden/orden.component';

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
        component: OrdenComponent,
        pathMatch:'full'
      },
      {
        path:'editar/:id',
        component: OrdenComponent,
        pathMatch:'full'
      },
      {
        path: '**',
        redirectTo: 'ordenes/listado'
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
export class OrdenesRoutingModule { }
