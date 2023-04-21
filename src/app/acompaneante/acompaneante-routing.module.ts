import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { AcompaneanteComponent } from './acompaneante/acompaneante.component';
import { AcompaneanteModule } from './acompaneante.module';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'listado',
      component: ListaComponent,
      pathMatch: 'full'
    },
    {
      path: 'agregar',
      component: AcompaneanteComponent,
      pathMatch: 'full'
    },
    {
      path:'editar/:id',
      component: AcompaneanteModule,
      pathMatch:'full'
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompaneanteRoutingModule { }
