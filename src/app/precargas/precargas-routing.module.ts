import { CrearComponent } from './crear/crear.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const rutas: Routes = [
  {
    path:'',
    children:[
      {
        path:'nueva',
        component: CrearComponent,
        pathMatch:'full'
      },
      {
        path:'precarga/:id',
        component: CrearComponent,
        pathMatch:'full'
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
export class PrecargasRoutingModule { }
