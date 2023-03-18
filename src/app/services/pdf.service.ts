import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import * as qrcode from 'qrcode';
import { OrdenesService } from './ordenes.service';
import { EscribanosService } from './escribanos.service';
import { MenoresService } from './menores.service';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  respuesta: any ={
    "nro_foja": "054050",
    "matricula":"1442",
    "apellidoescribano":"Rinher",
    "nombreescribano":"Jose",
    "apellidomenor":"Baez",
    "nombremenor":"misael",
    "nrodocumento":"48123654",
    "nacionalidad":"argentino",
    "fechanacimiento":"10102006",
    "fechahastacuando":"10102023",
    "autorizante":"Noelia ",
    "acompañanante":"Jose paco gabriel"
  }
  fechaPdf:string='';
  fojasPdf:string=''
  aprobacionPdf:string=''
  idEscribano!:number
  idMenor!:number

  constructor(
    private ordenesService:OrdenesService,
    private escribanosServices:EscribanosService,
    private menoresServices:MenoresService ) { }

  imprimirPDF(id:number){

    // datos de la orden
    this.ordenesService.getOrdenId(id).subscribe(
      (orden)=>{
        this.respuesta.nro_foja = orden.nro_foja
        this.respuesta.fechahastacuando = orden.fecha_vigencia_hasta
        this.respuesta.aprobacion = orden.aprobacion
        this.idEscribano = orden.notary_id!
        this.idMenor = orden.minor_id!
        this.fechaPdf = `Fecha: ${orden.fecha_del_instrumento}`
        this.fojasPdf = `Nº de serie y Nº de foja/ actuación notarial: ${ orden.serie_foja} ${orden.numero_actuacion_notarial_cert_firma}`
        this.aprobacionPdf = `Nº  de autorización otorgado por el Ministerio del Interior - Migraciones: ${orden.aprobacion}`
         // datos escribano
        this.escribanosServices.getEscribanoId(this.idEscribano).subscribe(
          (escribano)=>{
            this.respuesta.matricula = escribano.matricula
            this.respuesta.apellidoescribano = escribano.apellido
            this.respuesta.nombreescribano = escribano.nombre
        })
        //datos menores
        this.menoresServices.getMenorId(this.idMenor).subscribe(
          (menor)=>{
            this.respuesta.apellidomenor = menor.apellido
            this.respuesta.nombremenor = menor.nombre
            this.respuesta.nrodocumento = menor.numero_de_documento
            this.respuesta.nacionalidad = menor.nationality_id
            this.respuesta.fechanacimiento = menor.fecha_de_nacimiento
        })
        //datos Autorizantes

        //datos Acompañanates

        //datos progenitores
        this.respuesta.autorizante = ''
        this.respuesta.acompaneante = ''

        this.imprimendoPdf()
      })

  }

  async imprimendoPdf(){
     // Convierte el objeto respuesta a una cadena de texto
     const respuestaString = JSON.stringify(this.respuesta);
     // Genera el código QR en formato base 64 utilizando qrcode
     const qrCodeDataURL = await qrcode.toDataURL(respuestaString);
     // Crea el documento PDF y agrega el código QR en formato base 64 utilizando addImage
     const doc = new jsPDF();

     doc.setFontSize(16);
     doc.text('Colegio de Escribanos de la Provincia de Formosa.', 10, 10);
     doc.text(this.fechaPdf, 150, 10);
     doc.setFontSize(12);
     doc.text(this.fojasPdf, 10, 20);  // Agregamos 20 a la coordenada y
     doc.text(this.aprobacionPdf, 10, 25);  // Agregamos 40 a la coordenada y
     doc.addImage(qrCodeDataURL, 'PNG',  10, 30, 50, 50);
     // Abre el documento PDF en una nueva pestaña del navegador
     doc.output('dataurlnewwindow');
  }
}


