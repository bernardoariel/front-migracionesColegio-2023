import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { AutorizanteComponent } from 'src/app/autorizante/autorizante/autorizante.component';
import { ListaComponent as ListaAutorizantes} from 'src/app/autorizante/lista/lista.component';
import { ListaComponent as ListaMenores } from 'src/app/menor/lista/lista.component';
import { ListaComponent as ListaAcompaneantes } from 'src/app/acompaneante/lista/lista.component';
import { IPersona } from 'src/app/interfaces/IPersona';
import { MenorComponent } from 'src/app/menor/menor/menor.component';
import { ISolicitud, SolicitudService } from 'src/app/services/solicitud.service';
import { AcompaneanteComponent } from 'src/app/acompaneante/acompaneante/acompaneante.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('menor') menor!: MenorComponent;
  @ViewChild(ListaAutorizantes) ListaAutorizantes!: ListaAutorizantes;
  @ViewChild(ListaMenores) ListaMenores!: ListaMenores;
  @ViewChild(ListaAcompaneantes) ListaAcompaneantes!: ListaAcompaneantes;

  existeMenor: boolean = false;
  viajaSolo = 'si'
  solicitud!:ISolicitud
  // @ViewChild(ListaComponent) ListaComponent!: ListaComponent;
  titulo: string = 'Solicitud de Servicio';
  constructor( private dialog: MatDialog, private solicitudService: SolicitudService, router:Router) {

    this.solicitudService.obtenerSolicitud().subscribe({
      next: (solicitud)=>{
        if (solicitud !== null) {
          this.solicitud = solicitud;
          if(this.solicitud.menor !== null){
            this.existeMenor = true;
          }
        }

      }
    })
  }

  ngOnInit(): void {

  }

  /* creando un menor */
  crearMenor(){

    const modalMenor = this.dialog.open(MenorComponent,{
      width: '70vw',
      data: {
        modal:{
          tipoDialogo:'solicitud',
          accionModal:'agregar'
        }
      }
    });

    modalMenor.afterClosed().subscribe(result => {

     (result && result.persona) ? this.stepper.next() : null;

    });

  }
  /* seleccionando un menor para actualizar */
  seleccionarMenor(menor:IPersona){
    
    const modalMenor = this.dialog.open(MenorComponent,{
      width: '70vw',
      disableClose: true ,
      data: {
        menor,
        modal:{
          tipoDialogo:'solicitud',
          accionModal:'editar'
        }
      }
    })
    modalMenor.afterClosed().subscribe
    ((menor:IPersona)=>{

      this.ListaMenores.cargarMenores()
    })
  }

  /* Crear Persona  */
  crearPersona(tipo:string){

    if(tipo === 'autorizante'){
      const modalPersona = this.dialog.open(AutorizanteComponent,{
        width: '70vw',
        data: {
          modal:{
            tipoDialogo:'solicitud',
            accionModal:'agregar'
          }
        }
      });

      modalPersona.afterClosed().subscribe(result => {

        (result && result.persona) ? this.stepper.next() : null;
        this.ListaAutorizantes.cargarMenores();
      });

    }else{
      const modalPersona = this.dialog.open(AcompaneanteComponent,{
        width: '70vw',
        data: {
          modal:{
            tipoDialogo:'solicitud',
            accionModal:'agregar'
          }
        }
      });

      modalPersona.afterClosed().subscribe(result => {

        (result && result.persona) ? this.stepper.next() : null;
        this.ListaAcompaneantes.cargarMenores();
      });
    }
  }

  seleccionarAutorizante1(autorizante:IPersona){
    
    const modalPersona = this.dialog.open(AutorizanteComponent,{
      width: '70vw',
      disableClose: true ,
      data: {
        persona:autorizante,
        modal:{
          tipoDialogo:'solicitud',
          accionModal:'editar',
          persona:1
        }
      }
    })
    modalPersona.afterClosed().subscribe
    ((autorizante:IPersona)=>{

      this.ListaAutorizantes.cargarMenores()
    })
  }
  seleccionarAutorizante2(autorizante:IPersona){
    

    const modalPersona = this.dialog.open(AutorizanteComponent,{
      width: '70vw',
      disableClose: true ,
      data: {
        persona:autorizante,
        modal:{
          tipoDialogo:'solicitud',
          accionModal:'editar',
          persona:2
        }
      }
    })
    modalPersona.afterClosed().subscribe
    ((autorizante:IPersona)=>{

      this.ListaAutorizantes.cargarMenores()
    })
  }

  seleccionarAcompaneante(acompaneante:IPersona){
    
    const modalAcompaneante = this.dialog.open(AcompaneanteComponent,{
      width: '70vw',
      disableClose: true ,
      data: {
        persona:acompaneante,
        modal:{
          tipoDialogo:'solicitud',
          accionModal:'editar'
        }
      }
    })
    modalAcompaneante.afterClosed().subscribe
    ((acompanenante:IPersona)=>{
      this.ListaAcompaneantes.cargarMenores()
    })
  }

  eliminarMenor(): void {
    this.solicitudService.eliminarCampo(this.solicitud, 'menor');
    this.existeMenor = false;
  }

  eliminarAutorizante(nro:number): void {
    (nro === 1)
    ? this.solicitudService.eliminarCampo(this.solicitud, 'autorizante1')
    : this.solicitudService.eliminarCampo(this.solicitud, 'autorizante2')

  }

  eliminarAcompanante(index:number){
    this.solicitudService.eliminarCampo(this.solicitud, 'acompaneantes', index)
  }

}
