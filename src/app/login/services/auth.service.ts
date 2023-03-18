import { UsuarioModel } from './../modal/usuario.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  userToken: string | undefined | null;
  tipo: string | undefined | null;
  //CrearNuevoUsuario

  //Login
  constructor( private http: HttpClient) {

    this.leerToken()

  }

  login(usuario: any): Observable<any> {
    const authData = {
      ...usuario
    };

    return this.http
      .post<any>(`${this.baseUrl}/login`, authData)
      .pipe(
        map((resp) => {
          // console.log('estoy en auth', resp);
          console.log('entro en el mapa de rxjs');

          this.guardarToken(resp.access_token ?? '');
          if (resp.user) {
            localStorage.setItem('userId', resp.user.id.toString());
          }
          return resp;
        })
      );
  }

  logout(){
    localStorage.removeItem('token')
  }

  nuevoUsuario(usuario: UsuarioModel):Observable<UsuarioModel>{

    const authData = {
      ...usuario
    }

    return this.http
      .post<UsuarioModel>(`${this.baseUrl}/agregarUsuario`,
      authData).pipe(
        map( resp =>{
          console.log('entro en el mapa de rxjs')
          this.guardarToken(resp.access_token??'');
          return resp;
        })
      )

  }

  private guardarToken( idToken:string){

    this.userToken =idToken
    localStorage.setItem('token',idToken)

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString())

  }


  leerToken(){

    if(localStorage.getItem('token')){

      return this.userToken = localStorage.getItem('token')

    }else{

      return null;

    }

  }

  estaAutenticado():boolean{

    if( this.userToken && this.userToken.length <= 2) return false

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira)

    if(expiraDate > new Date()){

      return true

    }else{

      return false

    }

  }


}
