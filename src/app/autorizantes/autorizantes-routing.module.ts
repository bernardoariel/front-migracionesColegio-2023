import { AutorizanteComponent } from './autorizante/autorizante.component';
import { NgModule } from '@angular/core';
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
        component: AutorizanteComponent,
        pathMatch:'full'
      },
      {
        path:'editar/:id',
        component: AutorizanteComponent,
        pathMatch:'full'
      },
      {
        path: '**',
        redirectTo: 'autorizantes/listado'
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
export class AutorizantesRoutingModule { }
