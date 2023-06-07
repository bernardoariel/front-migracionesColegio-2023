import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
// import { ConfirmarComponent } from 'src/app/components/escribanos/confirmar/confirmar.component';
import { Escribano, Estado } from 'src/app/interfaces/escribano';
import { EscribanosService } from 'src/app/services/escribanos.service';
// import { Escribano, Estado } from '../../../interfaces/escribano';
// import { ConfirmarComponent } from '../confirmar/confirmar.component';

@Component({
  selector: 'app-escribano',
  templateUrl: './escribano.component.html',
  styleUrls: ['./escribano.component.scss']
})
export class EscribanoComponent implements OnInit {

  estados = [
    {
      id:'habilitado',
      desc:'HABILITADO',
    },
    {
      id:'inhabilitado',
      desc:'INHABILITADO'
    }
  ];

  escribano: Escribano = {
    nombre:'',
    apellido:'',
    matricula:'',
    email:'',
    habilitado:Estado.Habilitado,
  }

  constructor(
    private escribanosService:EscribanosService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog){}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.escribanosService.getEscribanoId(id))
      ).subscribe(escribano=> this.escribano = escribano)

  }
  guardar(){
    
    if(this.escribano.nombre.trim().length === 0){
      return;
    }

    if(this.escribano.id){
      
      //Actualizar
      this.escribanosService.actualizarEscribano(this.escribano)
        .subscribe(escribano => {
          this.mostrarMensaje('Registro Actualizado')
          this.router.navigate(['/escribanos/listado'])
        })
    }else{
      this.escribanosService.agregarEscribano(this.escribano)
      .subscribe(resp =>{
        
        this.mostrarMensaje('Registro Creado')
        this.router.navigate(['/escribanos/listado'])
      })
    }
  }

  mostrarMensaje(mensaje:string){
    this._snackBar.open( mensaje, 'OK!',{
      duration:2500
    })
  }

  eliminarEscribano(id:number){

    /* const dialog = this.dialog.open( ConfirmarComponent,{
     width: '250px',
     data: {...this.escribano}
    }) */

   /*  dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          if(id){
            this.escribanosService.eliminarEscribano(id)
            .subscribe(escribano => {
              this.mostrarMensaje('Registro Eliminado')
              this.router.navigate(['/escribanos'])
            })
          }

        }
      }
    ) */
  }


}
