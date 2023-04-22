import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { IPersona } from 'src/app/interfaces/IPersona';
import { MenorComponent } from 'src/app/menor/menor/menor.component';
import { ISolicitud, SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('menor') menor!: MenorComponent;
  solicitud!:ISolicitud
  // @ViewChild(ListaComponent) ListaComponent!: ListaComponent;
  titulo: string = 'Solicitud de Servicio';
  constructor( private dialog: MatDialog, private solicitudService: SolicitudService) {

    this.solicitudService.obtenerSolicitud().subscribe({
      next: (solicitud)=>{
       
       if (solicitud !== null) {
        this.solicitud = solicitud;
      }

      }
    })
  }

  ngOnInit(): void {

  }
  abrilModal(){

    const modalMenor = this.dialog.open(MenorComponent,{
      data: {
        modal:{
          tipoDialogo:'solicitud',
          accionModal:'agregar'
        }
      }
    });

    modalMenor.afterClosed().subscribe(()=>{

      this.stepper.next()

    })
  }

  seleccionarMenor(menor:IPersona){
    console.log(menor);
    const modalMenor = this.dialog.open(MenorComponent,{
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
      // this.cargarMenores()
    })
  }
  eliminarMenorSolicitud(){

    this.solicitudService.removerMenor();
    console.log('this.solicitud.menor::: ', this.solicitud.menor);
  }
}
