import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPersona } from 'src/app/interfaces/IPersona';
import { MenorComponent } from 'src/app/menor/menor/menor.component';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  @ViewChild('menor') menor!: MenorComponent;
  // @ViewChild(ListaComponent) ListaComponent!: ListaComponent;
  titulo: string = 'Solicitud de Servicio';
  constructor( private dialog: MatDialog) { }

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
      console.log('cerrado');
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
    modalMenor.afterClosed().subscribe((menor:IPersona)=>{
      // this.cargarMenores()
    })
  }

}
