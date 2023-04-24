import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { IOrden } from 'src/app/interfaces/IOrden';
import { IOrdenDatos } from 'src/app/interfaces/IOrden-datos';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { ISolicitud, SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-orden-form',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit, OnDestroy {
  solicitud!:ISolicitud;
  ordenNueva?:IOrden;
  tipoCualquierPaisSubscription?: Subscription;
  mayoriaEdadSubscription?: Subscription;
  today = new Date();
  fechaHoy = this.today.toISOString().slice(0, 10);
  rutaActual: string ='';
  mayoriaEdad:number = 21;
  fechaInstrumentoControl = new FormControl(new Date(), Validators.required);
  nroActuacionCertificacionFirmaControl =new FormControl<number | null | string>(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
  ]);
  opcionesInstrumento: [string, string] = ['PAPEL', 'DIGITAL'];
  tipoInstrumentoControl = new FormControl('PAPEL', Validators.required);

  opcionesCualquierPais = [
    { nombre: 'SI', valor: true },
    { nombre: 'NO', valor: false }
  ];
  tipoCualquierPaisControl = new FormControl<boolean>(true, Validators.required);

  paisesControl = new FormControl({value:'',disabled:true}, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(200),
  ]);

  opcionesMayoriaEdad = [
    { nombre: 'SI', valor: true },
    { nombre: 'NO', valor: false }
  ];
  mayoriaEdadControl = new FormControl<boolean>(false, Validators.required);

  fechaDesdeControl = new FormControl(new Date(), Validators.required);
  fechaHastaControl = new FormControl(new Date(), Validators.required);
  ordenForm = new FormGroup({
    fechaInstrumento: this.fechaInstrumentoControl,
    nroActuacionCertificacionFirma: this.nroActuacionCertificacionFirmaControl,
    tipoInstrumento: this.tipoInstrumentoControl,
    tipoCualquierPais: this.tipoCualquierPaisControl,
    paises: this.paisesControl,
    mayoriaEdad: this.mayoriaEdadControl,
    fechaDesde: this.fechaDesdeControl,
    fechaHasta: this.fechaHastaControl
  })

  constructor(
    private solicitudService: SolicitudService,
    private ordenesService:OrdenesService
  ) { }

  ngOnInit(): void {
    this.solicitudService.obtenerSolicitud().subscribe({
      next: (solicitud)=>{
        if (solicitud !== null) {
          this.solicitud = solicitud;
          console.log('solicitudOrden: ', this.solicitud);
        }
      }
    })
    this.tipoCualquierPaisControl.valueChanges.subscribe((value) => {
      if (value === true) {
        this.paisesControl.disable();
      } else {
        this.paisesControl.enable();
      }
    });
    this.mayoriaEdadControl.valueChanges.subscribe((value) => {

      if (value === true) {

        if(this.solicitud.menor.fecha_de_nacimiento){

          this.calcularMayoriaEdad(this.solicitud.menor.fecha_de_nacimiento)

        }

        this.fechaHastaControl.disable();

      } else {

        this.fechaHastaControl.setValue(new Date());
        this.fechaHastaControl.enable();

      }

    });
  }
  ngOnDestroy() {
    if (this.tipoCualquierPaisSubscription) {
      this.tipoCualquierPaisSubscription.unsubscribe();
    }

    if (this.mayoriaEdadSubscription) {

      this.mayoriaEdadSubscription.unsubscribe();
    }

  }

  calcularMayoriaEdad(fechaNacimiento: string) {
    console.log('fechaNacimiento::: ', fechaNacimiento);
    console.log('fechaNacimiento::: ', typeof(fechaNacimiento));
    const fechaNacimientoDate = new Date(fechaNacimiento);
    this.fechaHastaControl.setValue (new Date(fechaNacimientoDate.getFullYear() + this.mayoriaEdad, fechaNacimientoDate.getMonth(), fechaNacimientoDate.getDate()))

  }
  agregarSolicitud() {
    const valoresFormulario = this.ordenForm.value;
    let orden: IOrdenDatos = {
      numero_actuacion_notarial_cert_firma: (valoresFormulario.nroActuacionCertificacionFirma as string),
      cualquier_pais:valoresFormulario.tipoCualquierPais===true?'y':'n',
      serie_foja:'A',
      tipo_foja:0,
      vigencia_hasta_mayoria_edad:valoresFormulario.mayoriaEdad===true?'y':'n',
      fecha_vigencia_desde:valoresFormulario.fechaDesde ? valoresFormulario.fechaDesde.toISOString().slice(0, 10) : this.fechaHoy,
      fecha_vigencia_hasta:valoresFormulario.fechaHasta ? valoresFormulario.fechaHasta.toISOString().slice(0, 10) : this.fechaHoy,
      fecha_del_instrumento:valoresFormulario.fechaInstrumento ? valoresFormulario.fechaInstrumento.toISOString().slice(0, 10) : this.fechaHoy,
      instrumento:(valoresFormulario.tipoInstrumento==='PAPEL')?'P':'D',
      nro_foja:'0',
      paises_desc:valoresFormulario.paises||'',
    }
   this.solicitudService.agregarSolicitud(orden);
    this.ordenNueva ={
      ...orden,
      autorizante1_id:this.solicitud.autorizante1.id,
      autorizante2_id:this.solicitud.autorizante2.id,
      minor_id:this.solicitud.menor.id!,
      notary_id:2,
      acompaneantes:this.solicitud.acompaneantes

   }
   this.ordenesService.agregarOrden(this.ordenNueva)
    .pipe(take(1))
    .subscribe({
      next: (orden) => {
        console.log('orden: ', orden);
      }
    });


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
  /* fechaIgualesError(fechaDesde: Date | null, fechaHasta: Date | null): string | null {
    console.log('fechaHasta::: ', fechaHasta);
    console.log('fechaDesde::: ', fechaDesde);
    if (fechaDesde && fechaHasta && fechaDesde.getTime() === fechaHasta.getTime()) {
      return 'Las fechas no pueden ser iguales';
    }
    return null;
  } */
}
