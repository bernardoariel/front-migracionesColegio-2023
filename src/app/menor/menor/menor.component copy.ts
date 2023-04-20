import { PersonasService } from './../../services/personas.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IEmisorDocumentos } from 'src/app/interfaces/IEmisor-documentos';
import { INacionalidad } from 'src/app/interfaces/INacionalidad';
import { ITipoDocument } from 'src/app/interfaces/ITipo-document';
import { ISexo } from 'src/app/interfaces/isexo';
import { EmisorDocumentosService } from 'src/app/services/emisor-documentos.service';
import { NacionalidadesService } from 'src/app/services/nacionalidades.service';
import { SexoService } from 'src/app/services/sexo.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { IMenor } from 'src/app/interfaces/IMenor';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-menor',
  templateUrl: './menor.component.html',
  styleUrls: ['./menor.component.scss']
})
export class MenorComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  titulo = 'Agregando un Menor';
  rutaActual: string ='';
  idPersona: number | null = null;
  nacionalidades: INacionalidad[] = [];
  tipoDocumentos: ITipoDocument[] = [];
  emisorDocumentos: IEmisorDocumentos[] = [];
  sexo: ISexo[] = [];

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

  sexoControl = new FormControl<number | null>(null, [Validators.required]);

  domicilioControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(200),
  ]);

  // bsqMenorEncontrado?: IMenor
  bsqMenorEdad?: number


  menorForm = new FormGroup({
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

  events: string[] = [];

  /* addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    console.log(event.value)
    const fechaNacimiento = event.value!;
    const fechaNacimientoMenor = new Date(fechaNacimiento);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimientoMenor.getFullYear();

    if (edad >= 21) {

      this.openDialogMayorORMenor(edad)
    } else {
      console.log('Menor de edad');
    }


  } */

  constructor( private nacionalidadesService: NacionalidadesService,
              private tipoDocumentoService:TipoDocumentoService,
              private emisorDocumentosService:EmisorDocumentosService,
              private sexoService:SexoService,
              private personasService:PersonasService,
              private matDialog:MatDialog,
              private routes:Router,
              private activatedRoute: ActivatedRoute,
             ) { }

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

          this.personasService.getPersonaId(params['id']).subscribe((persona) => {
            this.menor = persona
            this.menorForm.setValue({
              apellido: this.menor.apellido,
              segundoApellido: this.menor.segundo_apellido ?? '',
              nombre: this.menor.nombre ?? '',
              otrosNombres: this.menor.otros_nombres ?? '',
              nacionalidad: this.menor.nationality_id ?? null,
              tipoDocumento: this.menor.type_document_id ?? null,
              emisorDocumento: this.menor.issuer_document_id ?? null,
              numeroDocumento:  Number(this.menor.numero_de_documento) ?? null,
              fechaNacimiento: this.menor.fecha_de_nacimiento ?? '',
              sexo: Number(this.menor.sex_id ?? null),
              domicilio: this.menor.domicilio ?? '',
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

    if (!this.menorForm.valid) return

    let menorNuevo: IMenor = {
      apellido: this.menorForm.value.apellido ?? '',
      segundo_apellido: this.menorForm.value.segundoApellido,
      nombre: this.menorForm.value.nombre ?? '',
      otros_nombres: this.menorForm.value.otrosNombres,
      nationality_id: this.menorForm.value.nacionalidad,
      type_document_id: this.menorForm.value.tipoDocumento,
      issuer_document_id: this.menorForm.value.emisorDocumento,
      numero_de_documento: this.menorForm.value.numeroDocumento ?? '',
      fecha_de_nacimiento: this.menorForm.value.fechaNacimiento ?? '',
      sex_id: this.menorForm.value.sexo ?? '',
      domicilio: this.menorForm.value.domicilio ?? ''
    };
    if(!this.idPersona){

      this.subscriptions.add(
        this.personasService.agregarPersonaMenor(menorNuevo).subscribe((menor)=>{
          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Menor registrado',
                message: 'Menor registrado correctamente'
              }
          });
          this.menorForm.reset();
          this.routes.navigate(['menores','listado']);
        })
      )

    }else{
      menorNuevo = {
        ...menorNuevo,
        id: this.idPersona
      };

      this.subscriptions.add(

        this.personasService.updatePersona(menorNuevo).subscribe((menor)=>{
          this.matDialog.open(ConfirmComponent, {
              data: {
                titulo: 'Menor registrado',
                message: 'Menor registrado correctamente'
              }
          });
          this.menorForm.reset();
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
    console.log('pasoporaca')
    /* cuando estoy creando */
    this.personasService.getExistePersonaByNumeroDocumento(this.menorForm.controls['numeroDocumento'].value as number)
    .subscribe((persona:IMenor)=>{
      console.log('persona::: ', persona.numero_de_documento);
      console.log('persona::: ', this.numeroDocumentoControl.value);
      if(persona.numero_de_documento != this.numeroDocumentoControl.value){

        this.numeroDocumentoControl.setErrors({'dniRepetido':true})
      }
      /* if(persona && persona.id){

          const edadMenor = this.verificarMayoriaEdad(persona.fecha_de_nacimiento)

          if(edadMenor < 21){
            console.log('Menor::: ', edadMenor);
            this.numeroDocumentoControl.setErrors({'dniRepetido':true})

            this.menorForm.controls['fechaNacimientoControl'].setErrors({'repetido':true})
            this.bsqMenorEncontrado = persona
            this.openDialogConfirm()

          }else{
            this.numeroDocumentoControl.setErrors({'dniRepetido':true})
            this.menorForm.controls['numeroDocumento'].setErrors({'repetido':true})
            this.bsqMenorEncontrado = persona
            this.openDialogConfirm()

          }
      } */

    })
  }

  verificarMayoriaEdad(fechaNacimiento:string | Date){

    if(!fechaNacimiento && typeof(fechaNacimiento)!= 'string') return 0

    const fechaNacimientoMenor = new Date(fechaNacimiento);
    const fechaActual = new Date();

    return fechaActual.getFullYear() - fechaNacimientoMenor.getFullYear();

  }


 /*  openDialogConfirm(): void {

    if(!this.bsqMenorEncontrado) return

      this.bsqMenorEdad =  this.verificarMayoriaEdad(this.bsqMenorEncontrado.fecha_de_nacimiento as string)

    const dialogRef: MatDialogRef<ConfirmComponent> = this.matDialog.open(ConfirmComponent, {
      width: '500px',
      data: {
        titulo: 'Menor Repetido o Invalido',
        mensaje: (this.bsqMenorEdad>21)? 'Los datos ingresados no corresponden a un menor' : 'El menor ya se encuentra registrado',
        bsqMenorEdad: this.bsqMenorEdad
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('result::: ', result);


      }

    });



  } */
  /* openDialogMayorORMenor(edad:number): void {


    const dialogRef: MatDialogRef<ConfirmComponent> = this.matDialog.open(ConfirmComponent, {
      width: '500px',
      data: {
        titulo: 'Menor Repetido o Invalido',
        mensaje: (edad>21)? 'La fecha ingresada corresponde a un mayor de edad' : 'La fecha ingresada corresponde a un menor de edad',
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('result::: ', result);




      }

    });



  } */

}
