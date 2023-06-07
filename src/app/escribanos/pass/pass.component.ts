import { Component, OnInit } from '@angular/core';
import { EscribanosService } from '../../services/escribanos.service';
import { Escribano } from '../../interfaces/escribano';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements OnInit {

  escribanos:Escribano[] = []
  constructor(private escribanosService:EscribanosService ) {}

  ngOnInit(): void {
  }

  cambiarContrasenas(){
    this.escribanosService.getEscribanos().subscribe(
      (escribano)=>{
        this.escribanos = escribano;
        this.escribanos.forEach((escribano)=>{
          // Genera una contraseña aleatoria
          const contrasena = this.generarContrasenaAleatoria();

          // Modifica la contraseña del escribano
          escribano.password = contrasena;
          this.escribanosService.actualizarEscribano(escribano).subscribe(
            ()=> {
             
            },
            (error)=>{
             
            }
          )
        })
      }
    )
  }

  generarContrasenaAleatoria() {
    let contrasena = [];
    const longitudContrasena = 8;

    // Genera una contraseña aleatoria de 8 caracteres
    for (let i = 0; i < longitudContrasena; i++) {
      // Genera un número aleatorio entre 0 y 1
      const numeroAleatorio = Math.random();

      // Genera un carácter aleatorio a partir del código ASCII
      // utilizando una función de transformación
      const caracterAleatorio = String.fromCharCode(
        Math.floor(numeroAleatorio * (122 - 48 + 1) + 48)
      );

      contrasena.push(caracterAleatorio);
    }

    // Filtra los símbolos de la contraseña
    contrasena = contrasena.filter((caracter) => {
      return /[a-zA-Z0-9]/.test(caracter);
    });

    // Asegúrate de que al menos uno de los caracteres es una mayúscula
    const expresionRegular = /[A-Z]/;
    if (!expresionRegular.test(contrasena.join(''))) {
      const indiceAleatorio = Math.floor(Math.random() * longitudContrasena);
      contrasena[indiceAleatorio] = contrasena[indiceAleatorio].toUpperCase();
    }

    return contrasena.join('');
  }

}

