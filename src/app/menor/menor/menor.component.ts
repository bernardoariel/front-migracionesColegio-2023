import { PersonasService } from './../../services/personas.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IEmisorDocumentos } from 'src/app/interfaces/IEmisor-documentos';
import { INacionalidad } from 'src/app/interfaces/INacionalidad';
import { ITipoDocument } from 'src/app/interfaces/ITipo-document';
import { ISexo } from 'src/app/interfaces/isexo';
import { EmisorDocumentosService } from 'src/app/services/emisor-documentos.service';
import { NacionalidadesService } from 'src/app/services/nacionalidades.service';
import { SexoService } from 'src/app/services/sexo.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { ConfirmComponent } from '../confirm/confirm.component';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersona } from 'src/app/interfaces/IPersona';





@Component({
  selector: 'app-menor',
  templateUrl: './menor.component.html',
  styleUrls: ['./menor.component.scss']
})
export class MenorComponent implements OnInit, OnDestroy {
  @ViewChild('apellidoInput') apellidoInput!: ElementRef<HTMLInputElement>;
  private subscriptions = new Subscription(); /// para hacer el Ondestroy

  /* para el template */
  titulo = 'Agregando un Menor';

  /* para obtener una sola persona */
  rutaActual: string ='';
  idPersona: number | null = null;

  /* Persona Por defecto */
  persona: IPersona = {
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
  /* para los select de los controles */
  nacionalidades: INacionalidad[] = [];
  tipoDocumentos: ITipoDocument[] = [];
  emisorDocumentos: IEmisorDocumentos[] = [];
  sexo: ISexo[] = [];

  /*  Controles */

  apellidoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern(/^[^0-9]+$/),
  ]);
  segundoApellidoControl = new FormControl('', [
    Validators.pattern(/^[^0-9]+$/),
  ]);
  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern(/^[^0-9]+$/),
  ]);
  otrosNombresControl = new FormControl('', [
    Validators.pattern(/^[^0-9]+$/),
  ]);
  nacionalidadControl = new FormControl<number>(11, [Validators.required]);
  documentosControl = new FormControl<number>(4, [Validators.required]);
  emisorControl = new FormControl<number>(13, [Validators.required]);
  numeroDocumentoControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
  ]);
  fechaNacimientoControl = new FormControl('', [this.fechaNacimientoValidator()]);
  sexoControl = new FormControl<number | null>(null, [Validators.required]);
  domicilioControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(200),
  ]);
  /* validador especifico */
  fechaNacimientoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaSeleccionada = control.value;
      const fechaActual = new Date();
      const edadMinima = 21;
      const fechaMinima = new Date(fechaActual.getFullYear() - edadMinima, fechaActual.getMonth(), fechaActual.getDate());

      if (fechaSeleccionada < fechaMinima) {
        return { edadMinima: true };
      }

      return null;
    };
  }

  /* persona Form */
  personaForm = new FormGroup({
    apellido: this.apellidoControl,
    segundoApellido: this.segundoApellidoControl ,
    nombre: this.nombreControl,
    otrosNombres: this.otrosNombresControl,
    nacionalidad: this.nacionalidadControl,
    tipoDocumento: this.documentosControl,
    emisorDocumento: this.emisorControl,
    numeroDocumento: this.numeroDocumentoControl,
    fechaNacimiento: this.fechaNacimientoControl,
    sexo: this.sexoControl,
    domicilio: this.domicilioControl
  });

  constructor( private nacionalidadesService: NacionalidadesService,
              private tipoDocumentoService:TipoDocumentoService,
              private emisorDocumentosService:EmisorDocumentosService,
              private sexoService:SexoService,
              private personasService:PersonasService,
              private matDialog:MatDialog,
              private routes:Router,
              private activatedRoute: ActivatedRoute,
             ) { }

ngAfterViewInit(): void {

  setTimeout(() => {
    if (this.apellidoInput?.nativeElement) {
      this.apellidoInput.nativeElement.focus();
      this.apellidoInput.nativeElement.select();
    }
  });

}
  ngOnInit(): void {

    this.subscriptions.add(
      this.nacionalidadesService.getNacionalidades().subscribe((nacionalidad)=>{
        this.nacionalidades = nacionalidad
        // console.log( this.nacionalidades)
      })
    )
    this.subscriptions.add(
      this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
        this.tipoDocumentos = tipoDocumento
        // console.log(this.tipoDocumentos)
      })
    )
    this.subscriptions.add(
      this.emisorDocumentosService.getTipoDocumentos().subscribe((emisorDocumento)=>{
        this.emisorDocumentos = emisorDocumento
        // console.log("->",this.emisorDocumentos)
      })
    )

    this.subscriptions.add(
      this.sexoService.getSexo().subscribe((sexo)=>{
        this.sexo = sexo
        // console.log(this.sexo)
      })
    )
    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        this.idPersona = params['id']
        this.subscriptions.add(

          this.personasService.getPersonaById(params['id']).subscribe((persona) => {
            this.persona = persona
            this.personaForm.setValue({
              apellido: this.persona.apellido,
              segundoApellido: this.persona.segundo_apellido ?? '',
              nombre: this.persona.nombre ?? '',
              otrosNombres: this.persona.otros_nombres ?? '',
              nacionalidad: this.persona.nationality_id ?? null,
              tipoDocumento: this.persona.type_document_id ?? null,
              emisorDocumento: this.persona.issuer_document_id ?? null,
              numeroDocumento:  Number(this.persona.numero_de_documento) ?? null,
              fechaNacimiento: this.persona.fecha_de_nacimiento ?? '',
              sexo: Number(this.persona.sex_id ?? null),
              domicilio: this.persona.domicilio ?? '',
            })
          })
        )

      } else {
        // El objeto params no tiene un parámetro 'id'
        console.log('El parámetro id no está presente');
      }

    });

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }

  guardar(){

    if (!this.personaForm.valid) return

    let personaNuevo: IPersona = {
      apellido: this.personaForm.value.apellido ?? '',
      segundo_apellido: this.personaForm.value.segundoApellido,
      nombre: this.personaForm.value.nombre ?? '',
      otros_nombres: this.personaForm.value.otrosNombres,
      nationality_id: this.personaForm.value.nacionalidad,
      type_document_id: this.personaForm.value.tipoDocumento,
      issuer_document_id: this.personaForm.value.emisorDocumento,
      numero_de_documento: this.personaForm.value.numeroDocumento ?? '',
      fecha_de_nacimiento: this.personaForm.value.fechaNacimiento ?? '',
      sex_id: this.personaForm.value.sexo ?? '',
      domicilio: this.personaForm.value.domicilio ?? ''
    };
    if(!this.idPersona){

      this.subscriptions.add(
        this.personasService.agregarPersona(personaNuevo).subscribe((persona)=>{
          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Menor registrado',
                message: 'Menor registrado correctamente'
              }
          });
          this.personaForm.reset();
          this.routes.navigate(['menores','listado']);
        })
      )

    }else{
      personaNuevo = {
        ...personaNuevo,
        id: this.idPersona
      };

      this.subscriptions.add(

        this.personasService.updatePersona(personaNuevo).subscribe((persona)=>{
          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Menor registrado',
                message: 'Menor registrado correctamente'
              }
          });
          this.personaForm.reset();
          this.routes.navigate(['menores','listado']);
        })
      )
    }

  }

  validarNumero(evento: KeyboardEvent) {
    const esNumero = /^[0-9]$/.test(evento.key);
    const esBorrado = evento.key === 'Backspace' || evento.key === 'Delete';
    const esTab = evento.key === 'Tab';
    const esFlecha = /^Arrow/.test(evento.key);
    const esCopia = (evento.ctrlKey || evento.metaKey) && evento.key === 'c';
    const esPega = (evento.ctrlKey || evento.metaKey) && evento.key === 'v';
    const esInicio = evento.key === 'Home';
    const esFin = evento.key === 'End';

    if (!esNumero && !esBorrado && !esTab && !esFlecha && !esCopia && !esPega && !esInicio && !esFin) {
      evento.preventDefault();
    }
  }

  buscarPersonaExistente(){

    this.personasService.getPersonaByDocumento(this.personaForm.controls['numeroDocumento'].value as number)
    .subscribe((persona:IPersona)=>{
   /*    console.log('persona::: ', persona);
      console.log('formCOntrol::: ', this.personaForm.controls['numeroDocumento'].value);
      console.log('del persona::: ', this.persona.numero_de_documento);
      console.log('del input::: ', this.numeroDocumentoControl.value); */
      if(persona && persona.id){
        if(this.persona.numero_de_documento != this.numeroDocumentoControl.value){

          this.numeroDocumentoControl.setErrors({'dniRepetido':true})
        }
      }



    })
  }



}
