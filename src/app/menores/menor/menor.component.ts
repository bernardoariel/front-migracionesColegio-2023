
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { NacionalidadesService } from 'src/app/services/nacionalidades.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

import { IEmisorDocumentos } from 'src/app/interfaces/IEmisor-documentos';
import { ISexo } from 'src/app/interfaces/isexo';
import { SexoService } from 'src/app/services/sexo.service';
import { INacionalidad } from 'src/app/interfaces/INacionalidad';
import { IMenor } from 'src/app/interfaces/IMenor';
import { MenoresService } from 'src/app/services/menores.service';
import { EmisorDocumentosService } from 'src/app/services/emisor-documentos.service';
import { ITipoDocument } from 'src/app/interfaces/ITipo-document';
import { IPersona } from 'src/app/interfaces/IPersona';

@Component({
  selector: 'app-menor',
  templateUrl: './menor.component.html',
  styleUrls: ['./menor.component.scss']
})
export class MenorComponent implements OnInit {

  @Output() cambiarTemplateMenorEvent = new EventEmitter();

  rutaActual: string ='';
  precarga: boolean = false;
  nacionalidades: INacionalidad[] = [];
  tipoDocumentos: ITipoDocument[] = [];
  emisorDocumentos: IEmisorDocumentos[] = [];
  sexo: ISexo[] = [];
  picker: any = '';
  menor: IMenor = {
    apellido:'',
    segundo_apellido: null,
    nombre:'',
    otros_nombres: null,
    nationality_id:11,
    type_document_id:4,
    issuer_document_id:13,
    numero_de_documento:'',
    fecha_de_nacimiento: '',
    sex_id: null,
    domicilio:'',
  }

  constructor(
    private menoresService:MenoresService,
    private nacionalidadesService:NacionalidadesService,
    private tipoDocumentoService:TipoDocumentoService,
    private emisorDocumentosService:EmisorDocumentosService,
    private sexoService:SexoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog

  ) {


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
        this.menoresService.getMenorId(params['id']).subscribe((menor) => {
          this.menor = menor;
          
          
        });
      } else {
        // El objeto params no tiene un parámetro 'id'
        
      }

    });


    this.nacionalidadesService.getNacionalidades().subscribe((nacionalidad)=>{
      this.nacionalidades = nacionalidad
      
    })

    this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
      this.tipoDocumentos = tipoDocumento
      
    })

    this.emisorDocumentosService.getTipoDocumentos().subscribe((emisorDocumento)=>{
      this.emisorDocumentos = emisorDocumento
      
    })

    this.sexoService.getSexo().subscribe((sexo)=>{
      this.sexo = sexo
      
    })


  }

  guardar(){
    if(this.menor.nombre.trim().length === 0){
      return;
    }

    if(this.menor.id){

      this.menor.fecha_de_nacimiento = new Date(this.menor.fecha_de_nacimiento as string).toLocaleDateString('fr-CA')
      //Actualizar
      this.menoresService.actualizarMenor(this.menor)
        .subscribe(menor => {
          
          
          // this.mostrarMensaje('Registro Actualizado')
          if(!this.precarga) {
            this.router.navigate(['/menores/listado'])
            return

          }else{
            this.cambiarTemplateMenorEvent.emit();
          }

        })

    }else{

      this.menor.fecha_de_nacimiento = new Date(this.menor.fecha_de_nacimiento as string).toLocaleDateString('fr-CA')
      this.menoresService.agregarMenor(this.menor)
      .subscribe(resp =>{
        
        

        if(!this.precarga) {
          this.router.navigate(['/menores/listado'])
          return

        }else{
          this.cambiarTemplateMenorEvent.emit();
        }
      })
    }


  }

  eliminarEscribano(id:number){
    
    
  }
  cancelar(){

    if(!this.precarga) {

      this.router.navigate(['/menores/listado'])
      return

    }else{
      this.cambiarTemplateMenorEvent.emit();
    }

  }


}
