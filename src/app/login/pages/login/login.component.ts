
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../modal/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: UsuarioModel = {
    email:'',
    password:'',
    nombre:'',
    access_token:'',

  }

  recordarme: boolean=  false;
  logueado = false;
  constructor( private auth: AuthService,
               private router:Router) {

               }

  ngOnInit(  ) {

    if(localStorage.getItem('email')){

      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login( form:NgForm){

    if( form.invalid ) return

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text: 'Espere por favor'
    });

    Swal.showLoading

    this.auth.login(this.usuario)
      .subscribe(resp => {
        console.log('aca tengo la respuesta'+resp)
        Swal.close();
        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email?? '')
        }
        console.log('me estoy logueando')
        this.logueado = true;
        this.router.navigate(['/dashboard'])
    }, (error=>{

      Swal.fire({
        icon:'error',
        title:'Error al autenticar',
        text: 'Es un error'
      });

    }))

  }

}
