import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListadoComponent } from './listado/listado.component';
import { EscribanoComponent } from './escribano/escribano.component';
import { PassComponent } from './pass/pass.component';

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
        component: EscribanoComponent,
        pathMatch:'full'
      },
      {
        path:'editar/:id',
        component: EscribanoComponent,
        pathMatch:'full'
      },
      {
        path:'pass/todos',
        component: PassComponent,
        pathMatch:'full'
      },
      {
        path: '**',
        redirectTo: 'escribano/listado'
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
export class EscribanosRoutingModule { }
