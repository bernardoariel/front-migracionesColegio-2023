import { CaracterAutorizanteService } from './../../services/caracter-autorizante.service';
import { Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAcreditacionVinculo } from 'src/app/interfaces/IAcreditacion-Vinculo';
import { ICaracterAutorizante } from 'src/app/interfaces/ICaracter-Autorizante';
import { IEmisorDocumentos } from 'src/app/interfaces/IEmisor-documentos';
import { INacionalidad } from 'src/app/interfaces/INacionalidad';
import { IPersona } from 'src/app/interfaces/IPersona';
import { ITipoDocument } from 'src/app/interfaces/ITipo-document';
import { ISexo } from 'src/app/interfaces/isexo';
import { IModal } from 'src/app/menor/menor/menor.component';
import { EmisorDocumentosService } from 'src/app/services/emisor-documentos.service';
import { NacionalidadesService } from 'src/app/services/nacionalidades.service';
import { PersonasService } from 'src/app/services/personas.service';
import { SexoService } from 'src/app/services/sexo.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AcreditacionVinculoService } from 'src/app/services/acreditacion-vinculo.service';


@Component({
  selector: 'app-autorizante',
  templateUrl: './autorizante.component.html',
  styleUrls: ['./autorizante.component.scss']
})
export class AutorizanteComponent implements OnInit {
  @ViewChild('apellidoInput') apellidoInput!: ElementRef<HTMLInputElement>;
  private subscriptions = new Subscription(); /// para hacer el Ondestroy

  /* para el template */
  titulo = ' un Autorizante';
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
    authorizing_relatives_id: 1,
    accreditation_links_id: 1,
  }

  /* para los select de los controles */
  nacionalidades: INacionalidad[] = [];
  tipoDocumentos: ITipoDocument[] = [];
  emisorDocumentos: IEmisorDocumentos[] = [];
  sexo: ISexo[] = [];
  caracterAutorizantes:ICaracterAutorizante[] =[];
  acreditacionVinculos: IAcreditacionVinculo[] = [];

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
  caracterAutorizanteControl = new FormControl<number>(13, [Validators.required]);
  acreditacionVinculoControl = new FormControl<number>(13, [Validators.required]);
  /* validador especifico */
  fechaNacimientoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaSeleccionada = control.value;
      const fechaActual = new Date();
      const edadMinima = 21;
      const fechaMinima = new Date(fechaActual.getFullYear() - edadMinima, fechaActual.getMonth(), fechaActual.getDate());

      if (fechaSeleccionada > fechaMinima) {
        return { mayorEdad: true };
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
    domicilio: this.domicilioControl,
    caracterAutorizante:this.caracterAutorizanteControl,
    acreditacionVinculo: this.acreditacionVinculoControl
  });
  constructor(
    private nacionalidadesService: NacionalidadesService,
    private tipoDocumentoService:TipoDocumentoService,
    private emisorDocumentosService:EmisorDocumentosService,
    private sexoService:SexoService,
    private personasService:PersonasService,
    private matDialog:MatDialog,
    private routes:Router,
    private caracterAutorizanteService:CaracterAutorizanteService,
    private acreditacionVinculoService: AcreditacionVinculoService,
    private solicitudService: SolicitudService,
    public dialogRef?:MatDialogRef<AutorizanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { persona?: IPersona, modal?:IModal }
  ) {

      if(data?.persona){
        this.persona = data.persona!
        console.log('this.persona::: ', this.persona);
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
          caracterAutorizante: Number(this.persona.authorizing_relatives_id) || null,
          acreditacionVinculo: Number(this.persona.accreditation_links_id) || null
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
    this.subscriptions.add(
      this.caracterAutorizanteService.getCaracterAutorizantes().subscribe((caracterAutorizante)=>{
        this.caracterAutorizantes = caracterAutorizante
        // console.log(this.caracterAutorizante)
      })
    )

    this.subscriptions.add(
      this.acreditacionVinculoService.getAcreditarVinculos().subscribe((acreditacionVinculo)=>{
        this.acreditacionVinculos = acreditacionVinculo
        // console.log(this.acreditacionVinculo)
      })
    )

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }

  guardar(){

    if (!this.personaForm.valid) return //si es invalido el formulario  no hace nada

    let personaNuevo: IPersona = { //crea un objeto personaNuevo con los valores del formulario
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

    // AGREGAR DESDE EL MODULO DEL MENOR
    if(this.modal.tipoDialogo == 'autorizante' && this.modal.accionModal == 'agregar'){

      this.subscriptions.add(
        this.personasService.agregarPersona(personaNuevo).subscribe((persona)=>{

          this.dialogRef?.close() // cierra el modal de la carga del menor

          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Autorizante registrado',
                message: 'Autorizante registrado correctamente'
              }
          });

          // this.personaForm.reset();


        })
      )

    }
    // EDITAR DESDE EL MODULO DEL MENOR
    if(this.modal.tipoDialogo == 'autorizante' && this.modal.accionModal == 'editar'){

      personaNuevo = {
        ...personaNuevo,
        id: this.data?.persona?.id
      };

      this.subscriptions.add(

        this.personasService.updatePersona(personaNuevo).subscribe((persona)=>{
          this.dialogRef?.close()
          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Autorizante registrado',
                message: 'Autorizante registrado correctamente'
              }
          });

        })
      )

    }

    // AGREGAR DESDE EL MODULO DE LA SOLICITUD
    if(this.modal.tipoDialogo == 'solicitud' && this.modal.accionModal == 'agregar'){

      this.subscriptions.add(

        this.personasService.agregarPersona(personaNuevo).subscribe((persona)=>{

          this.dialogRef?.close({persona: persona})
          this.dialogRef?.close() // cierra el modal de la carga del menor
          if(this.modal.persona == 1){

            this.solicitudService.agregarAutorizante1(persona) // agrega el menor a la solicitud
          }else{

            this.solicitudService.agregarAutorizante2(persona) // agrega el menor a la solicitud
          }

         /*  this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Autorizante registrado',
                message: 'Autorizante registrado correctamente'
              }
          }); */


        })
      )

    }

    // EDITAR DESDE EL MODULO DE LA SOLICITUD
    if(this.modal.tipoDialogo == 'solicitud' && this.modal.accionModal == 'editar'){

      personaNuevo = {
        ...personaNuevo,
        id: this.data?.persona?.id
      };


      if(this.modal.persona == 1){

        this.solicitudService.agregarAutorizante1(personaNuevo)
        // agrega el menor a la solicitud
      }else{

        this.solicitudService.agregarAutorizante2(personaNuevo) // agrega el menor a la solicitud
      }

      this.subscriptions.add(

        this.personasService.updatePersona(personaNuevo).subscribe((persona)=>{
          this.dialogRef?.close({persona: persona})

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

      this.routes.navigate(['autorizantes','listado']);

    }

  }
}
