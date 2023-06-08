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

  respuesta:any
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
 async imprimendoPdf() {
  // Convierte el objeto respuesta a una cadena de texto
  const respuestaString = JSON.stringify(this.respuesta);
  // Genera el código QR en formato base 64 utilizando qrcode
  const qrCodeDataURL = await qrcode.toDataURL(respuestaString);
  // Crea el documento PDF y agrega el código QR en formato base 64 utilizando addImage
  const doc = new jsPDF();
  // Tamaño deseado de la imagen
  const imagenWidth = 15; // Ancho en unidades del documento PDF
  const imagenHeight = 15; // Alto en unidades del documento PDF

  const recuadroWidth = 130; // Ancho del recuadro
  const recuadroHeight = 30; // Alto del recuadro

  const logo = './assets/images/logo_formosa.jpg';

  // Agregar imagen en el margen superior izquierdo
  doc.addImage(logo, 'JPEG', 10, 10, imagenWidth, imagenHeight);

  // Obtener la fecha actual en formato "dd-mm-yyyy"
  const fechaActual = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Agregar texto después de la imagen
  doc.setFontSize(15);
  doc.text('Colegio de Escribanos de la Provincia de Formosa.', 30, 20);
  doc.setFontSize(10);
  doc.text(fechaActual, 155, 20); // Agregar la fecha actual al lado del texto

  // Agregar texto Nro. de actuacion notarial arriba del recuadro
  doc.setFontSize(11);
  doc.text(`Nro. de Aprobación: ${this.respuesta.aprobacion}`, 10, 30); // Ajustar las coordenadas para la posición vertical
  doc.text(`Nro. de Certificacion: ${this.respuesta.certificacion}`, 120, 30); // Ajustar las coordenadas para la posición vertical
 
// Formatear la fecha de vigencia desde
const fechaDesde = new Date(this.respuesta.fechadesde).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
doc.text(`Fecha de Vigencia desde: ${fechaDesde}`, 10, 35); // Ajustar las coordenadas para la posición vertical

// Formatear la fecha de vigencia hasta
const fechaHasta = new Date(this.respuesta.fechahasta).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
doc.text(`Fecha de Vigencia hasta: ${fechaHasta}`, 120, 35); // Ajustar las coordenadas para la posición vertical // Ajustar las coordenadas para la posición vertical

  // Coordenadas del recuadro y el código QR
  const posicionRecuadroX = 10;
  const posicionRecuadroY = 40;
  const posicionQRX = posicionRecuadroX + recuadroWidth + 10;
  const posicionQRY = posicionRecuadroY - 3;

  // Dibujar recuadro del menor
  doc.rect(posicionRecuadroX, posicionRecuadroY, recuadroWidth, recuadroHeight);
  doc.setFontSize(10);
  doc.text('Datos del menor', posicionRecuadroX + 100, posicionRecuadroY + 5);
  doc.setFontSize(12);
  doc.text('Nombre del Menor', posicionRecuadroX + 5, posicionRecuadroY + 10);
  const menorNombre = this.respuesta.menor.nombremenor.toUpperCase();
  const menorApellido = this.respuesta.menor.apellidomenor.toUpperCase();
  const nombreCompleto = menorNombre + ' ' + menorApellido;
  doc.text(nombreCompleto, posicionRecuadroX + 45, posicionRecuadroY + 10);
  doc.text('DNI del Menor:', posicionRecuadroX + 5, posicionRecuadroY + 20);
  doc.text(this.respuesta.menor.nrodocumento, posicionRecuadroX + 45, posicionRecuadroY + 20); // Agregar el dato del DNI al lado del texto correspondiente

  // Dibujar recuadro de los autorizantes
  const autorizanteRecuadroY = posicionRecuadroY + recuadroHeight + 10;
  doc.rect(posicionRecuadroX, autorizanteRecuadroY , recuadroWidth, recuadroHeight + 5);
  doc.setFontSize(10);
  doc.text('Datos de los autorizantes', posicionRecuadroX + 87, autorizanteRecuadroY + 5);
  doc.setFontSize(12);

  const factorDesplazamientoDentro = 5; // Espacio reducido entre filas dentro del mismo índice
  const factorDesplazamientoEntre = 4; // Espacio más grande entre diferentes índices

  let desplazamientoY = autorizanteRecuadroY + 10; // Desplazamiento inicial para el primer elemento

  for (let i = 0; i < this.respuesta.autorizante.length; i++) {
    const autorizante = this.respuesta.autorizante[i];
    const autorizanteNombre = autorizante.nombreautorizante.toUpperCase();
    const autorizanteApellido = autorizante.apellidoautorizante.toUpperCase();
    const autorizanteDocumento = autorizante.nrodocumentoautorizante;

    doc.text('Nombre:  ' + autorizanteNombre + ' ' + autorizanteApellido, posicionRecuadroX + 5, desplazamientoY);
    desplazamientoY += factorDesplazamientoDentro; // Incrementar el desplazamiento dentro del mismo índice

    doc.text('Documento:  ' + autorizanteDocumento.toString(), posicionRecuadroX + 5, desplazamientoY);
    desplazamientoY += factorDesplazamientoDentro; // Incrementar el desplazamiento dentro del mismo índice

    if (i === 0) {
      desplazamientoY += factorDesplazamientoEntre; // Incrementar el desplazamiento entre diferentes índices solo para el primer elemento
    } else if (i === 1) {
      desplazamientoY -= factorDesplazamientoEntre; // Reducir el desplazamiento entre diferentes índices para el segundo elemento
    }
  }

  // Dibujar recuadro de los acompañantes si existen
  if (this.respuesta.acompaneante && this.respuesta.acompaneante.length > 0) {
    const acompananteRecuadroY = autorizanteRecuadroY + recuadroHeight + 20;

    doc.setFontSize(12);
    doc.text('Datos de los acompañantes', 10, acompananteRecuadroY);
    // Dibujar línea debajo de los datos de los acompañantes
  const lineaY = acompananteRecuadroY + 2;
  doc.setLineWidth(0.5);
  doc.line(posicionRecuadroX, lineaY, posicionRecuadroX + recuadroWidth, lineaY);

    // Ajuste del primer registro
    const primerDesplazamientoY = acompananteRecuadroY + 10;
    let desplazamientoYAcompanante = primerDesplazamientoY;

    for (let i = 0; i < this.respuesta.acompaneante.length; i++) {
      const acompanante = this.respuesta.acompaneante[i];
      const acompananteNombre = acompanante.nombreacompaneante.toUpperCase();
      const acompananteApellido = acompanante.apellidoacompaneante.toUpperCase();
      const acompananteDocumento = acompanante.nrodocumentoacompaneante;

      doc.setFontSize(10);
      doc.text(`${acompananteNombre} ${acompananteApellido} - DNI: ${acompananteDocumento}`, posicionRecuadroX + 5, desplazamientoYAcompanante);
      desplazamientoYAcompanante += factorDesplazamientoDentro; // Incrementar el desplazamiento vertical entre registros
    }
  }

  // Agregar código QR
  doc.addImage(qrCodeDataURL, 'PNG', posicionQRX, posicionQRY, 50, 50);

  // Agregar nombre del escribano debajo del código QR
  const escribanoNombre = `Escribano: ${this.respuesta.escribano.apellidoescribano} ${this.respuesta.escribano.nombreescribano}`;
  doc.setFontSize(8);
  doc.text(escribanoNombre, posicionQRX + 3, posicionQRY + 55);

  // Abre el documento PDF en una nueva pestaña del navegador
  doc.output('dataurlnewwindow');
}






  
}


