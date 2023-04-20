import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmisorDocumentos } from 'src/app/interfaces/IEmisor-documentos';
import { IMenor } from 'src/app/interfaces/IMenor';
import { INacionalidad } from 'src/app/interfaces/INacionalidad';
import { IPersona } from 'src/app/interfaces/IPersona';
import { ITipoDocument } from 'src/app/interfaces/ITipo-document';
import { ISexo } from 'src/app/interfaces/isexo';
import { EmisorDocumentosService } from 'src/app/services/emisor-documentos.service';
import { NacionalidadesService } from 'src/app/services/nacionalidades.service';
import { PersonasService } from 'src/app/services/personas.service';
import { SexoService } from 'src/app/services/sexo.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-autorizante',
  templateUrl: './autorizante.component.html',
  styleUrls: ['./autorizante.component.scss']
})
export class AutorizanteComponent implements OnInit {

  private subscriptions = new Subscription();

  nacionalidades: INacionalidad[] = [];
  tipoDocumentos: ITipoDocument[] = [];
  emisorDocumentos: IEmisorDocumentos[] = [];
  sexo: ISexo[] = [];

  menor: IPersona = {
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
  bsqMenorEncontrado?: IPersona
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

  autorizanteForm = new FormGroup({
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

    if (!this.autorizanteForm.valid) return

    const autorizanteNuevo: IPersona = {
      apellido: this.autorizanteForm.value.apellido ?? '',
      segundo_apellido: this.autorizanteForm.value.segundoApellido,
      nombre: this.autorizanteForm.value.nombre ?? '',
      otros_nombres: this.autorizanteForm.value.otrosNombres,
      nationality_id: this.autorizanteForm.value.nacionalidad,
      type_document_id: this.autorizanteForm.value.tipoDocumento,
      issuer_document_id: this.autorizanteForm.value.emisorDocumento,
      numero_de_documento: this.autorizanteForm.value.numeroDocumento ?? '',
      fecha_de_nacimiento: this.autorizanteForm.value.fechaNacimiento ?? '',
      sex_id: this.autorizanteForm.value.sexo ?? '',
      domicilio: this.autorizanteForm.value.domicilio ?? ''
    };
    this.subscriptions.add(
      this.personasService.agregarPersonaMenor(autorizanteNuevo).subscribe((autorizante)=>{
        this.matDialog.open(ConfirmComponent, {
            data: {
              titulo: 'Autorizante registrado',
              message: 'Autorizante registrado correctamente'
            }
        });
        this.autorizanteForm.reset();
        this.routes.navigate(['autorizantes','listado']);
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

  buscarPersonaExistente(){
    console.log('blur::: ');
    this.personasService.getPersonaByDocumento(this.autorizanteForm.controls['numeroDocumento'].value as number)
    .subscribe((persona)=>{
      console.log('Persona::: ', persona);

      if(persona){

          const edadMenor = this.verificarMayoriaEdad(persona.fecha_de_nacimiento)

          if(edadMenor < 21){
            console.log('Menor::: ', edadMenor);

            this.autorizanteForm.controls['numeroDocumento'].setErrors({'repetido':true})
            this.bsqMenorEncontrado = persona
            this.openDialogConfirm()

          }else{

            this.autorizanteForm.controls['numeroDocumento'].setErrors({'repetido':true})
            this.bsqMenorEncontrado = persona
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
