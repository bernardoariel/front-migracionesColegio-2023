import { AcompaneantesService } from './../../services/acompaneantes.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IProgenitor } from 'src/app/interfaces/iprogenitor';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ITipoDocument } from '../../interfaces/ITipo-document';


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
  constructor(
    private acompaneantesService: AcompaneantesService,
    private tipoDocumentoService:TipoDocumentoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    /* reviso si en la ruta existe la palabra nueva */
    this.activatedRoute.url.subscribe(url => {
      this.rutaActual = url.map(segment => segment.path).join('/');
      console.log(this.rutaActual); // Imprime la ruta actual como una cadena de texto cada vez que cambia
      if(this.rutaActual=='nueva') this.precarga = true

    });
    console.log(this.activatedRoute.params);

    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        this.acompaneantesService.getProgenitorId(params['id']).subscribe((progenitor) => {
          this.progenitor = progenitor
          // console.log('this.menor.fecha_de_nacimiento ', this.progenitor.fecha_de_nacimiento);
          // console.log('Este es un menor', this.autorizante);
        });
      } else {
        // El objeto params no tiene un parámetro 'id'
        console.log('El parámetro id no está presente');
      }

    });
    console.log(this.activatedRoute.params);

    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        this.acompaneantesService.getProgenitorId(params['id']).subscribe((progenitor) => {
          this.progenitor = progenitor
          // console.log('this.menor.fecha_de_nacimiento ', this.progenitor.fecha_de_nacimiento);
          // console.log('Este es un menor', this.autorizante);
        });
      } else {
        // El objeto params no tiene un parámetro 'id'
        console.log('El parámetro id no está presente');
      }

    });
    this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
      this.tipoDocumentos = tipoDocumento
      // console.log(this.tipoDocumentos)
    })

  }
  guardar(){
    if(this.progenitor.nombre.trim().length === 0){
      return;
    }

    if(this.progenitor.id){

      this.acompaneantesService.actualizarProgenitor(this.progenitor)
        .subscribe(progenitor => {
          console.log(progenitor)
          console.log('precarga:', this.precarga)
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
        console.log('Respuesta', resp)
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
    console.log('cancelar')
    console.log('this.precarga',this.precarga)

    if(!this.precarga) {

      this.router.navigate(['/acompaneantes/listado'])
      return

    }else{

      this.cambiarTemplateAcompaneanteEvent.emit()

    }

  }
}
