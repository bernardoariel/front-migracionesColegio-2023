import { UsuarioModel } from './../../modal/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';

import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario!: UsuarioModel;
  recordarme:boolean = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'ariel@hotmail.com'
  }
  onSubmit( form: NgForm){
    if( form.invalid ) return

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text: 'Espere por favor'
    });
    Swal.showLoading;
    this.auth.nuevoUsuario(this.usuario).subscribe(resp =>{

      console.log(resp)
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email?? '')
      }
      this.router.navigateByUrl('/home')
    }, (err)=>{
      console.log(err)
      Swal.fire({
        icon:'error',
        title:'Error al autenticar',
        text: 'Es un error'
      });
    })
  }


}
