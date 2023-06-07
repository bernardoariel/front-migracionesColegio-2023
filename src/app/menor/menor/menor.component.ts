import { PersonasService } from './../../services/personas.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { SolicitudService } from 'src/app/services/solicitud.service';


//crear interface IModal
export interface IModal {
  tipoDialogo: string,
  accionModal: string,
  persona?: number
}

@Component({
  selector: 'app-menor',
  templateUrl: './menor.component.html',
  styleUrls: ['./menor.component.scss']
})
export class MenorComponent implements OnInit, OnDestroy {
  @ViewChild('apellidoInput') apellidoInput!: ElementRef<HTMLInputElement>;
  private subscriptions = new Subscription(); /// para hacer el Ondestroy

  /* para el template */
  titulo = ' un Menor';
  /* para obtener una sola persona */
  rutaActual: string ='';
  idPersona: number | null = null;
  modal:IModal = {} as IModal;

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

  constructor(
    private nacionalidadesService: NacionalidadesService,
    private tipoDocumentoService:TipoDocumentoService,
    private emisorDocumentosService:EmisorDocumentosService,
    private sexoService:SexoService,
    private personasService:PersonasService,
    private matDialog:MatDialog,
    private routes:Router,
    private solicitudService: SolicitudService,
    public dialogRef?:MatDialogRef<MenorComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { menor?: IPersona, modal?:IModal }
  ) {

      if(data?.menor){
        this.persona = data.menor!
        
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
      }
      if(data?.modal){
        this.modal = data.modal
      }


  }

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
      })
    )
    this.subscriptions.add(
      this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
        this.tipoDocumentos = tipoDocumento
      })
    )
    this.subscriptions.add(
      this.emisorDocumentosService.getTipoDocumentos().subscribe((emisorDocumento)=>{
        this.emisorDocumentos = emisorDocumento
      })
    )

    this.subscriptions.add(
      this.sexoService.getSexo().subscribe((sexo)=>{
        this.sexo = sexo
      })
    )

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }

  guardar(){

    if (!this.personaForm.valid) return //si es invalido el formulario  no hace nada

    let fechaNacimiento = this.personaForm.value.fechaNacimiento;
    
    let fechaNacimientoDate: Date | null = null;
    

    if (fechaNacimiento) {
      fechaNacimientoDate = new Date(fechaNacimiento);
      fechaNacimiento = fechaNacimientoDate.toISOString().substring(0, 10);
    }
    

    let personaNuevo: IPersona = { //crea un objeto personaNuevo con los valores del formulario
      apellido: this.personaForm.value.apellido ?? '',
      segundo_apellido: this.personaForm.value.segundoApellido,
      nombre: this.personaForm.value.nombre ?? '',
      otros_nombres: this.personaForm.value.otrosNombres,
      nationality_id: this.personaForm.value.nacionalidad,
      type_document_id: this.personaForm.value.tipoDocumento,
      issuer_document_id: this.personaForm.value.emisorDocumento,
      numero_de_documento: this.personaForm.value.numeroDocumento ?? '',
      fecha_de_nacimiento: fechaNacimiento,
      sex_id: this.personaForm.value.sexo ?? '',
      domicilio: this.personaForm.value.domicilio ?? ''
    };
    
    // AGREGAR DESDE EL MODULO DEL MENOR
    if(this.modal.tipoDialogo == 'menor' && this.modal.accionModal == 'agregar'){

      this.subscriptions.add(
        this.personasService.agregarPersona(personaNuevo).subscribe((persona)=>{

          this.dialogRef?.close() // cierra el modal de la carga del menor

          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Menor registrado',
                message: 'Menor registrado correctamente'
              }
          });

          // this.personaForm.reset();


        })
      )

    }
    // EDITAR DESDE EL MODULO DEL MENOR
    if(this.modal.tipoDialogo == 'menor' && this.modal.accionModal == 'editar'){

      personaNuevo = {
        ...personaNuevo,
        id: this.data?.menor?.id
      };

      this.subscriptions.add(

        this.personasService.updatePersona(personaNuevo).subscribe((persona)=>{
          this.dialogRef?.close()
          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Menor registrado',
                message: 'Menor registrado correctamente'
              }
          });


        })
      )

    }

    // AGREGAR DESDE EL MODULO DE LA SOLICITUD
    if(this.modal.tipoDialogo == 'solicitud' && this.modal.accionModal == 'agregar'){

      this.subscriptions.add(

        this.personasService.agregarPersona(personaNuevo).subscribe((persona)=>{

          this.dialogRef?.close({persona: persona}) // cierra el modal de la carga del menor
          this.solicitudService.agregarMenor(persona) // agrega el menor a la solicitud

        })
      )

    }

    // EDITAR DESDE EL MODULO DE LA SOLICITUD
    if(this.modal.tipoDialogo == 'solicitud' && this.modal.accionModal == 'editar'){

      personaNuevo = {
        ...personaNuevo,
        id: this.data?.menor?.id
      };


      this.solicitudService.agregarMenor(personaNuevo)
      this.subscriptions.add(

        this.personasService.updatePersona(personaNuevo).subscribe((persona)=>{
          this.dialogRef?.close()
          // this.matDialog.open(ConfirmComponent, {
          //     data: {
          //       titulo: 'Menor registrado',
          //       message: 'Menor registrado correctamente'
          //     }
          // });


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

      if(persona && persona.id){
        if(this.persona.numero_de_documento != this.numeroDocumentoControl.value){

          this.numeroDocumentoControl.setErrors({'dniRepetido':true})
        }
      }

    })
  }

  cancelar(){
    if(this.dialogRef){

      this.dialogRef.close()

    }else{

      this.routes.navigate(['menores','listado']);

    }

  }
}
