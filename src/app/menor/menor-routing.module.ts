import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado',
        component: ListaComponent,
        pathMatch:'full'
      },
      // {
      //   path:'agregar',
      //   component: MenorComponent,
      //   pathMatch:'full'
      // },
      // {
      //   path:'editar/:id',
      //   component: MenorComponent,
      //   pathMatch:'full'
      // },
      // {
      //   path: '**',
      //   redirectTo: 'menores/listado'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenorRoutingModule { }
