
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";

import { PrincipalComponent } from './dashboard/pages/principal/principal.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { AuthGuard } from './login/guards/auth.guard';
import { LoginComponent } from './login/pages/login/login.component';
import { VideosComponent } from './components/shared/videos/videos.component';

registerLocaleData(localeES, 'es');
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    component:PrincipalComponent,
    pathMatch: 'full',
    children:[
      {
        path:'',
        component: HomeComponent
      }
    ],
    canActivate:[AuthGuard]
  },
  {
    path: 'escribanos',
    loadChildren: ()=> import('./escribanos/escribanos.module').then( m => m.EscribanosModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'menores',
    loadChildren: ()=> import('./menores/menores.module').then( m => m.MenoresModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'autorizantes',
    loadChildren: ()=> import('./autorizantes/autorizantes.module').then( m => m.AutorizantesModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'progenitores',
    loadChildren: ()=> import('./progenitores/progenitores.module').then( m => m.ProgenitoresModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'ordenes',
    loadChildren: ()=> import('./ordenes/ordenes.module').then( m => m.OrdenesModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'precargas',
    loadChildren: ()=> import('./precargas/precargas.module').then( m => m.PrecargasModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'acompaneantes',
    loadChildren: ()=> import('./acompaneantes/acompaneantes.module').then( m => m.AcompaneantesModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'videos',
    component: VideosComponent,
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

