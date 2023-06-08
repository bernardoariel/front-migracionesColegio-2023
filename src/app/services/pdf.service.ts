import { PersonasService } from './personas.service';
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
    "nro_foja": "",
    "matricula":"",
    "apellidoescribano":"",
    "nombreescribano":"",
    "apellidomenor":"",
    "nombremenor":"",
    "nrodocumento":"",
    "nacionalidad":"",
    "fechanacimiento":"",
    "fechahastacuando":"",
    "autorizante":" ",
    "acompañanante":""
  }
  fechaPdf:string='';
  fojasPdf:string=''
  aprobacionPdf:string=''
  idEscribano!:number
  idMenor!:number

  constructor(
    private ordenesService:OrdenesService,
    private escribanosServices:EscribanosService,
    private personasServices:PersonasService ) { }

  imprimirPDF(id:number,respuesta:any){
    this.respuesta = respuesta
    // this.fojasPdf = 'Fojas: ' + this.respuesta.nro_foja
    this.imprimendoPdf()
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


