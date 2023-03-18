import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EscribanosService } from '../../../services/escribanos.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  token: string = '';
  usuario!: number;
  nombreUsuario:string = '';
  maximoNumberUser: number = 2; //con este usuario valido que sea mayor que 1
  constructor(
    private router:Router,
    private escribanosService: EscribanosService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')){

      if(localStorage.getItem('userId')){

        this.usuario = Number(localStorage.getItem('userId'))
        console.log(`${this.usuario}<=${this.maximoNumberUser}`)
        this.escribanosService.getEscribanoId(this.usuario).subscribe(
          (escribano)=>{

            this.nombreUsuario = `${escribano.nombre} ${escribano.apellido} - ${escribano.matricula}`
          }
        )
      }else{
        localStorage.clear();
        this.router.navigateByUrl('/');
      }
    }else{

      localStorage.clear();
    this.router.navigateByUrl('/');

    }
  }
  salir() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  irVideos(){
    this.router.navigate(['videos'])
  }
}
