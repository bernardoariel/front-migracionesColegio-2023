import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorizantesService } from 'src/app/services/autorizantes.service';
import { IAutorizante } from 'src/app/interfaces/IAutorizante';
import { switchMap } from 'rxjs';
import { INacionalidad } from 'src/app/interfaces/INacionalidad';

import { IEmisorDocumentos } from 'src/app/interfaces/IEmisor-documentos';
import { ISexo } from 'src/app/interfaces/isexo';

import { NacionalidadesService } from 'src/app/services/nacionalidades.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { EmisorDocumentosService } from 'src/app/services/emisor-documentos.service';
import { SexoService } from 'src/app/services/sexo.service';
import { CaracterAutorizanteService } from 'src/app/services/caracter-autorizante.service';
import { AcreditacionVinculoService } from 'src/app/services/acreditacion-vinculo.service';
import { ITipoDocument } from '../../interfaces/ITipo-document';
import { ICaracterAutorizante } from '../../interfaces/ICaracter-Autorizante';
import { IAcreditacionVinculo } from '../../interfaces/IAcreditacion-Vinculo';


@Component({
  selector: 'app-autorizante',
  templateUrl: './autorizante.component.html',
  styleUrls: ['./autorizante.component.scss']
})
export class AutorizanteComponent implements OnInit {

  @Output() cambiarTemplateAutorizante_aEvent = new EventEmitter();
  @Output() cambiarTemplateAutorizante_bEvent = new EventEmitter();

  rutaActual: string ='';
  precarga: boolean = false;

  nacionalidades: INacionalidad[] = [];
  tipoDocumentos: ITipoDocument[] = [];
  emisorDocumentos: IEmisorDocumentos[] = [];
  caracterAutorizantes:ICaracterAutorizante[] =[];
  acreditacionVinculos: IAcreditacionVinculo[] = [];
  sexo: ISexo[] = [];
  picker: any = '';
  autorizante: IAutorizante = {
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
    authorizing_relatives_id:null,
    accreditation_links_id:null,
    telefono:'',
    requiere_aut_adicional_de:''
  }
  constructor(
    private autorizantesService:AutorizantesService,
    private nacionalidadesService:NacionalidadesService,
    private tipoDocumentoService:TipoDocumentoService,
    private emisorDocumentosService:EmisorDocumentosService,
    private sexoService:SexoService,
    private caracterAutorizanteService:CaracterAutorizanteService,
    private acreditacionVinculoService:AcreditacionVinculoService,
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
    console.log(this.activatedRoute.params);// Imprime la ruta actual como una cadena de texto

    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        this.autorizantesService.getAutorizanteId(params['id']).subscribe((autorizante) => {
          this.autorizante = autorizante
          console.log('this.menor.fecha_de_nacimiento ', this.autorizante.fecha_de_nacimiento);
          console.log('Este es un menor', this.autorizante);
        });
      } else {
        // El objeto params no tiene un parámetro 'id'
        console.log('El parámetro id no está presente');
      }

    });

    this.nacionalidadesService.getNacionalidades().subscribe((nacionalidad)=>{
      this.nacionalidades = nacionalidad
      // console.log( this.nacionalidades)
    })

    this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
      this.tipoDocumentos = tipoDocumento
      // console.log(this.tipoDocumentos)
    })

    this.emisorDocumentosService.getTipoDocumentos().subscribe((emisorDocumento)=>{
      this.emisorDocumentos = emisorDocumento
      // console.log("->",this.emisorDocumentos)
    })

    this.sexoService.getSexo().subscribe((sexo)=>{
      this.sexo = sexo
      // console.log(this.sexo)
    })
    this.caracterAutorizanteService.getCaracterAutorizantes().subscribe((autorizante)=>{
      this.caracterAutorizantes = autorizante
     console.log(this.caracterAutorizantes)
    })
    this.acreditacionVinculoService.getAcreditarVinculos()
    .subscribe((acreditacionVinculo)=>{
      this.acreditacionVinculos = acreditacionVinculo
      // console.log(this.sexo)
    })

  }

  guardar(){
    if(this.autorizante.nombre.trim().length === 0){
      return;
    }


    // console.log("pregarga",this.precarga,this.autorizante.id )
    if(this.autorizante.id){

      this.autorizante.fecha_de_nacimiento = new Date(this.autorizante.fecha_de_nacimiento).toLocaleDateString('fr-CA')

      this.autorizantesService.actualizarAutorizado(this.autorizante)
        .subscribe(autorizante => {
          console.log(autorizante)
          console.log('precarga:', this.precarga)
          // this.mostrarMensaje('Registro Actualizado')
          if(!this.precarga) {

             this.router.navigate(['/autorizantes/listado'])
            return

          }else{

            this.cambiarTemplateAutorizante_aEvent.emit()
            this.cambiarTemplateAutorizante_bEvent.emit()
          }


        })
    }else{

      this.autorizante.fecha_de_nacimiento = new Date(this.autorizante.fecha_de_nacimiento).toLocaleDateString('fr-CA')
      this.autorizantesService.agregarAutorizante(this.autorizante)
      .subscribe(resp =>{
        console.log('Respuesta', resp)

        if(!this.precarga) {

          this.router.navigate(['/autorizantes/listado'])
         return

       }else{

         this.cambiarTemplateAutorizante_aEvent.emit()
         this.cambiarTemplateAutorizante_bEvent.emit()
       }
      })
    }
  }

  eliminarAutorizante(id:number){
    console.log("Eliminar: ",id)
    this.autorizantesService.eliminarAutorizante(id).subscribe(console.log)
  }

  cancelar(){
    console.log('cancelar')
    console.log('this.precarga',this.precarga)
    if(!this.precarga) {

      this.router.navigate(['/autorizantes/listado'])
      return

    }else{

      this.cambiarTemplateAutorizante_aEvent.emit()
      this.cambiarTemplateAutorizante_bEvent.emit()

    }

  }
}
