import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado',
        component: ListaComponent,
        pathMatch:'full'
      },
      {
        path:'nueva',
        component: SolicitudComponent,
        pathMatch:'full'
      },
      {
        path:'editar/:id',
        component: SolicitudComponent,
        pathMatch:'full'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
