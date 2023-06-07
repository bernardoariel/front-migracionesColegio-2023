import { switchMap } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IProgenitor } from 'src/app/interfaces/iprogenitor';
import { ProgenitorService } from 'src/app/services/progenitor.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITipoDocument } from 'src/app/interfaces/ITipo-document';
@Component({
  selector: 'app-progenitor',
  templateUrl: './progenitor.component.html',
  styleUrls: ['./progenitor.component.scss']
})
export class ProgenitorComponent implements OnInit {

  @Output() cambiarTemplateProgenitorEvent = new EventEmitter();
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
    private progenitoresService:ProgenitorService,
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
      
      if(this.rutaActual=='nueva') this.precarga = true

    });
    

    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        this.progenitoresService.getProgenitorId(params['id']).subscribe((progenitor) => {
          this.progenitor = progenitor
          
          
        });
      } else {
        // El objeto params no tiene un parámetro 'id'
        
      }

    });
    /* this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.progenitoresService.getProgenitorId(id))
      ).subscribe((progenitor) =>{
         this.progenitor = progenitor
        }
    ) */
    this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
      this.tipoDocumentos = tipoDocumento
      
    })

  }

  guardar(){
    if(this.progenitor.nombre.trim().length === 0){
      return;
    }

    if(this.progenitor.id){

      this.progenitoresService.actualizarProgenitor(this.progenitor)
        .subscribe(progenitor => {
          
          
          // this.mostrarMensaje('Registro Actualizado')
          if(!this.precarga) {

            this.router.navigate(['/progenitores/listado'])
            return

          }else{

            this.cambiarTemplateProgenitorEvent.emit()

          }

        })
    }else{

      this.progenitoresService.agregarProgenitor(this.progenitor)
      .subscribe(resp =>{
        
      //  this.mostrarMensaje('Registro Creado')

         if(!this.precarga) {

          this.router.navigate(['/progenitores/listado'])
          return

        }else{

          this.cambiarTemplateProgenitorEvent.emit()

        }
      })
    }

  }
  cancelar(){
    
    

    if(!this.precarga) {

      this.router.navigate(['/progenitores/listado'])
      return

    }else{

      this.cambiarTemplateProgenitorEvent.emit()


    }

  }
}
