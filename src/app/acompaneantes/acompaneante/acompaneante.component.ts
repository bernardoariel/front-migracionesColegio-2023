import { MensajeConfirmacionComponent } from './../../components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { AcompaneantesService } from './../../services/acompaneantes.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IProgenitor } from 'src/app/interfaces/iprogenitor';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ITipoDocument } from '../../interfaces/ITipo-document';
import { MensajeConfirmacionServiceService } from 'src/app/services/mensaje-confirmacion-service.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-acompaneante',
  templateUrl: './acompaneante.component.html',
  styleUrls: ['./acompaneante.component.scss']
})
export class AcompaneanteComponent implements OnInit {


  @Output() cambiarTemplateAcompaneanteEvent = new EventEmitter();

  rutaActual: string ='';
  precarga: boolean = false;

  tipoDocumentos: ITipoDocument[] = [];

  progenitor: IProgenitor = {
    apellido:'',
    segundo_apellido: null,
    nombre:'',
    otros_nombres: null,
    type_document_id:4,
    numero_de_documento:''
  }
  acompaneantes: IProgenitor[] = []
  constructor(
    private acompaneantesService: AcompaneantesService,
    private tipoDocumentoService:TipoDocumentoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private mensajeConfirmacionService:MensajeConfirmacionServiceService
  ) { }
  openModal(): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.progenitor = {
        apellido:'',
        segundo_apellido: null,
        nombre:'',
        otros_nombres: null,
        type_document_id:4,
        numero_de_documento:''
      }
    });
  }
  onClearInputs() {
    
    this.mensajeConfirmacionService.confirmClearInputs();
  }
  ngOnInit(): void {
    /* reviso si en la ruta existe la palabra nueva */
    this.activatedRoute.url.subscribe(url => {
      this.rutaActual = url.map(segment => segment.path).join('/');
      
      if(this.rutaActual=='nueva') this.precarga = true

    });
    

    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        this.acompaneantesService.getProgenitorId(params['id']).subscribe((progenitor) => {
          this.progenitor = progenitor
          
          
        });
      } else {
        // El objeto params no tiene un parámetro 'id'
        
      }

    });
    

    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        this.acompaneantesService.getProgenitorId(params['id']).subscribe((progenitor) => {
          this.progenitor = progenitor
          
          
        });
      } else {
        // El objeto params no tiene un parámetro 'id'
        
      }

    });
    this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
      this.tipoDocumentos = tipoDocumento
      
    })

  }
  addAcompaneante(){

  if (!/^[0-9]+$/.test(this.progenitor.numero_de_documento) || this.progenitor.numero_de_documento.length < 4) {
    alert('El campo de documento debe contener solamente números y tener al menos 4 dígitos.');
    return false;
  }

  if (this.progenitor.nombre.length < 4) {
    alert('El campo de nombre debe tener al menos 4 caracteres.');
    return false;
  }

  if (this.progenitor.apellido.length < 4) {
    alert('El campo de apellido debe tener al menos 4 caracteres.');
    return false;
  }
  let nuevoAcompaneante: IProgenitor = {
    apellido:this.progenitor.apellido,
    segundo_apellido: this.progenitor.segundo_apellido ,
    nombre:this.progenitor.nombre,
    otros_nombres: this.progenitor.otros_nombres,
    type_document_id: this.progenitor.type_document_id,
    numero_de_documento: this.progenitor.numero_de_documento,
    tipo_acompaneante:''
  }
    this.acompaneantes.push(nuevoAcompaneante)
    

    this.openModal()

    return null
  }
  openConfirmationDialog() {
    // aquí abres el diálogo de confirmación
    this.mensajeConfirmacionService.clearInputs$.subscribe(() => {
      this.onClearInputs();
    });
  }

  limpiandoInputs(){
    
    this.progenitor = {
      apellido:'',
      segundo_apellido: null,
      nombre:'',
      otros_nombres: null,
      type_document_id:4,
      numero_de_documento:''
    }
  }
  guardar(){

    if(this.progenitor.nombre.trim().length === 0){
      return;
    }


    if(this.progenitor.id){

      this.acompaneantesService.actualizarProgenitor(this.progenitor)
        .subscribe(progenitor => {
          
          
          // this.mostrarMensaje('Registro Actualizado')
          if(!this.precarga) {

            this.router.navigate(['/acompaneantes/listado'])
            return

          }else{

            this.cambiarTemplateAcompaneanteEvent.emit()

          }

        })
    }else{

      this.acompaneantesService.agregarProgenitor(this.progenitor)
      .subscribe(resp =>{
        
        
        return null;
      //  this.mostrarMensaje('Registro Creado')
      if(!this.precarga) {

        this.router.navigate(['/acompaneantes/listado'])
        return

      }else{

        this.cambiarTemplateAcompaneanteEvent.emit()

      }
      })
    }

  }
  cancelar(){
    
    

    if(!this.precarga) {

      this.router.navigate(['/acompaneantes/listado'])
      return

    }else{

      this.cambiarTemplateAcompaneanteEvent.emit()

    }

  }

}
