import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {}

  canActivate() {
    // Verifica si el token existe en el localStorage
    if (localStorage.getItem('token')) {
      // Si existe, permite el acceso a la ruta protegida
      return true;
    } else {
      // Si no existe, redirige al usuario a la ruta de inicio de sesión
      this.router.navigate(['/']);
      return false;
    }
  }

}
