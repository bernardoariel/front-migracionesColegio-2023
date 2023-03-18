import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { AcompaneanteComponent } from './acompaneante/acompaneante.component';


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
        component: AcompaneanteComponent,
        pathMatch:'full'
      },
      {
        path:'editar/:id',
        component: AcompaneanteComponent,
        pathMatch:'full'
      },
      {
        path: '**',
        redirectTo: 'acompaneantes/listado'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports:[
    RouterModule
  ]

})
export class AcompaneantesRoutingModule { }
