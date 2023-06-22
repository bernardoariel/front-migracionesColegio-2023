
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
    loadChildren: ()=> import('./menor/menor.module').then( m => m.MenorModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'autorizantes',
    loadChildren: ()=> import('./autorizante/autorizante.module').then( m => m.AutorizanteModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'solicitudes',
    loadChildren: ()=> import('./solicitud/solicitud.module').then( m => m.SolicitudModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'ordenes',
    loadChildren: ()=> import('./ordenes/ordenes.module').then( m => m.OrdenesModule),
    canActivate:[AuthGuard]
  },
 
  {
    path: 'acompaneante',
    loadChildren: ()=> import('./acompaneante/acompaneante.module').then( m => m.AcompaneanteModule),
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

