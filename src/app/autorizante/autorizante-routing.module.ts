import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { AutorizanteComponent } from './autorizante/autorizante.component';

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
      component: AutorizanteComponent,
      pathMatch: 'full'
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizanteRoutingModule { }
