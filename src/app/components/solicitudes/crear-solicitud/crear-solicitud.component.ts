
import { Component, OnInit } from '@angular/core';


import { IOrden } from '../../../interfaces/IOrden';
import { OrdenesService } from '../../../services/ordenes.service';
import { Router } from '@angular/router';
import { IOrdenPersonas } from 'src/app/interfaces/IOrden-personas';
import { IOrdenDatos } from 'src/app/interfaces/IOrden-datos';


@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {

  solicitud: any[]=[]
/*   miSolicitud: IOrden = {
    notary_id:1,
    minor_id:null,
    acompaneante1_id: null,
    acompaneante2_id: null,
    progenitor1_id: null,
    progenitor2_id: null,
    numero_actuacion_notarial_cert_firma:'',
    cualquier_pais:'',
    serie_foja:'',
    tipo_foja:null,
    vigencia_hasta_mayoria_edad:'',
    fecha_vigencia_desde:'',
    fecha_vigencia_hasta:'',
    fecha_del_instrumento:'',
    instrumento:'',
    nro_foja:'',
    paises_desc:'',
  }
 */
  miOrdenPersonas:IOrdenPersonas ={

    notary_id:1,
    minor_id: null,
    acompaneante1_id: null,
    acompaneante2_id:  null,
    progenitor1_id: null,
    progenitor2_id:  null,

  }

  miOrdenDatos:IOrdenDatos ={

    aprobacion:null,
    numero_actuacion_notarial_cert_firma:'',
    cualquier_pais:'',
    serie_foja:'',
    tipo_foja:null,
    vigencia_hasta_mayoria_edad:'',
    fecha_vigencia_desde:'',
    fecha_vigencia_hasta:'',
    fecha_del_instrumento:'',
    instrumento:'',
    nro_foja:'',
    paises_desc:'',

  }
  orden!:IOrden
  constructor( private ordenesService:OrdenesService, private router:Router) { }

  ngOnInit(): void {
  }

  agregarNuevoMenor( menor: number){
    

    this.miOrdenPersonas.minor_id = menor;
    

  }
  agregarAutorizante1(autorizante:number){

    
    this.miOrdenPersonas.acompaneante1_id = autorizante;

  }
  agregarAutorizante2(autorizante:number){

    
    this.miOrdenPersonas.acompaneante2_id = autorizante;
  }
  agregarProgenitor(progenitor:number){

    
    this.miOrdenPersonas.progenitor1_id = progenitor;
  }
  actualizarSolicitud(orden:IOrdenDatos){
    this.miOrdenDatos = orden;
  }
  crearOrden(){
    this.miOrdenDatos.fecha_vigencia_desde = new Date(this.miOrdenDatos.fecha_vigencia_desde).toLocaleDateString('fr-CA')
    this.miOrdenDatos.fecha_vigencia_hasta = new Date(this.miOrdenDatos.fecha_vigencia_hasta).toLocaleDateString('fr-CA')
    this.miOrdenDatos.fecha_del_instrumento = new Date(this.miOrdenDatos.fecha_del_instrumento).toLocaleDateString('fr-CA')
    
    // this.orden = Object.assign({}, this.miOrdenPersonas, this.miOrdenDatos);
    this.orden = { ...this.miOrdenPersonas , ...this.miOrdenDatos} ;
    
    this.ordenesService.agregarOrden(this.orden)
    .subscribe(resp =>{
      
      
    //  this.mostrarMensaje('Registro Creado')
        this.router.navigate(['/solicitudes'])
    })
  }
 
}
