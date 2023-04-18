import { PersonasService } from './../../services/personas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Router, Routes } from '@angular/router';




@Component({
  selector: 'app-menor',
  templateUrl: './menor.component.html',
  styleUrls: ['./menor.component.scss']
})
export class MenorComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

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
  bsqMenorEncontrado?: IMenor
  bsqMenorEdad?: number


  apellidoControl = new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern(/^[^0-9]+$/)
  ]);

  segundoApellidoControl = new FormControl('',[
    Validators.pattern(/^[^0-9]+$/)
  ]);

  nombreControl = new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern(/^[^0-9]+$/)
  ]);

  otrosNombresControl = new FormControl('',[
    Validators.pattern(/^[^0-9]+$/)
  ]);

  nacionalidadControl = new FormControl<number>(11, [Validators.required]);
  documentosControl = new FormControl<number>(4, [Validators.required]);
  emisorControl = new FormControl<number>(13, [Validators.required]);

  // crear formcontro para un numero de documento y validar que sea un numero
  numeroDocumentoControl = new FormControl<number | null>(null,[
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),

  ]);

  fechaNacimientoControl = new FormControl('',[
    Validators.required
  ]);

  sexoControl = new FormControl<number | null>(null,
    [Validators.required]
  );

  domicilioControl = new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(200),
  ]);

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
  constructor( private nacionalidadesService: NacionalidadesService,
              private tipoDocumentoService:TipoDocumentoService,
              private emisorDocumentosService:EmisorDocumentosService,
              private sexoService:SexoService,
              private personasService:PersonasService,
              private matDialog:MatDialog,
              private routes:Router
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




  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  guardar(){

    if (!this.menorForm.valid) return

    const menorNuevo: IMenor = {
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
  }

  cancelar(){
    console.log('cancelar');
  }

  validarNumero(evento: KeyboardEvent){

    const esNumero = /^[0-9]$/.test(evento.key);
    const esBorrado = evento.key === 'Backspace' || evento.key === 'Delete';
    const esTab = evento.key === 'Tab';

    if (!esNumero && !esBorrado && !esTab) {

      evento.preventDefault();

    }

  }

  buscarMenorRepetido(){
    console.log('blur::: ');
    this.personasService.getMenorPersonasByNumeroDocumento(this.menorForm.controls['numeroDocumento'].value as number)
    .subscribe((menor)=>{
      console.log('menor::: ', menor);

      if(menor && menor.fecha_de_nacimiento){

          const edadMenor = this.verificarMayoriaEdad(menor.fecha_de_nacimiento)

          if(edadMenor < 21){
            console.log('Repetido::: ', edadMenor);

            this.menorForm.controls['numeroDocumento'].setErrors({'repetido':true})
            this.bsqMenorEncontrado = menor
            this.openDialogConfirm()

          }else{

            this.menorForm.controls['numeroDocumento'].setErrors({'repetido':true})
            this.bsqMenorEncontrado = menor
            this.openDialogConfirm()

          }
        }

    })
  }

  verificarMayoriaEdad(fechaNacimiento:string){

    if(!fechaNacimiento && typeof(fechaNacimiento)!= 'string') return 0

    const fechaNacimientoMenor = new Date(fechaNacimiento);
    const fechaActual = new Date();

    return fechaActual.getFullYear() - fechaNacimientoMenor.getFullYear();

  }

  openDialogConfirm(): void {

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
        // El usuario seleccionó "Sí"
         /* this.eliminarEstudiante.emit(matricula)
         this.snackBar.open('Estudiante eliminado con exito', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',

        }) */

      }

    });



  }

}
