import { Component, EventEmitter, OnInit, Output,Input,OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrdenDatos } from 'src/app/interfaces/IOrden-datos';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit, OnChanges   {

  orden: IOrdenDatos = {
    numero_actuacion_notarial_cert_firma:'',
    cualquier_pais:'y',
    serie_foja:'',
    tipo_foja:0,
    vigencia_hasta_mayoria_edad:'',
    fecha_vigencia_desde:'',
    fecha_vigencia_hasta:'',
    fecha_del_instrumento:'',
    instrumento:'p',
    nro_foja:'',
    paises_desc:'a cualquier pais',
  }

  miPropiedad:boolean = true;
  rutaActual: string = '';

  @Output() onCargarSolicitud: EventEmitter<IOrdenDatos> = new EventEmitter<IOrdenDatos>
  @Output() onSeleccionarAutorizante: EventEmitter<number> = new EventEmitter<number>();
  @Input() fechaMayorEdad?: Date | String;
  constructor(
    private router:Router,
    private ordenesService:OrdenesService,
    private activatedRoute:ActivatedRoute
  ) {

    const hoy = new Date();
    this.orden.vigencia_hasta_mayoria_edad = 'n';
    this.orden.fecha_vigencia_desde = hoy.toISOString();
    this.orden.fecha_vigencia_hasta = hoy.toISOString();
    this.orden.fecha_del_instrumento = hoy.toISOString();
  }

  ngOnInit(): void {

    console.log("desde orden component:",this.fechaMayorEdad)
    console.log("----->",this.orden)

    console.log("path",this.activatedRoute.snapshot.url[0].path)
    console.log("id",this.activatedRoute.snapshot.params['id'])
    if(this.activatedRoute.snapshot.url[0].path=='precarga'){
      this.ordenesService.getOrdenId(this.activatedRoute.snapshot.params['id']).subscribe(
        (orden)=>{
          this.orden = {
            numero_actuacion_notarial_cert_firma:orden.numero_actuacion_notarial_cert_firma,
            cualquier_pais:orden.cualquier_pais,
            serie_foja:orden.serie_foja,
            tipo_foja:orden.tipo_foja,
            vigencia_hasta_mayoria_edad:orden.vigencia_hasta_mayoria_edad,
            fecha_vigencia_desde:orden.fecha_vigencia_desde,
            fecha_vigencia_hasta:orden.fecha_vigencia_hasta,
            fecha_del_instrumento:orden.fecha_del_instrumento,
            instrumento:orden.instrumento,
            nro_foja:orden.nro_foja,
            paises_desc:orden.paises_desc,
          }
        }
      )
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.orden.vigencia_hasta_mayoria_edad == 'y') {

      this.miPropiedad = true;

    } else {

      this.miPropiedad = false;

    }

  }
  onMayoriaEdad(){

    if(this.orden.vigencia_hasta_mayoria_edad=='y'){

      new Date(this.orden.fecha_vigencia_hasta).toLocaleDateString('fr-CA')

    }else{

      this.orden.fecha_vigencia_hasta = this.fechaMayorEdad!.toString() || new Date(this.orden.fecha_vigencia_hasta).toLocaleDateString('fr-CA') ;

    }

  }

  guardar(){

    /* estoy haciendo esto para que no se modifique en la carga al tocar guardar */
    let ordenTuneada: IOrdenDatos;
    this.orden.nro_foja = this.orden.numero_actuacion_notarial_cert_firma
    this.orden.serie_foja = 'A'
    this.orden.tipo_foja = 0;
    ordenTuneada = {...this.orden}
    console.log('ordentuneada',ordenTuneada)

    ordenTuneada.fecha_vigencia_desde = new Date(ordenTuneada.fecha_vigencia_desde).toLocaleDateString('fr-CA')
    ordenTuneada.fecha_vigencia_hasta = new Date(ordenTuneada.fecha_vigencia_hasta).toLocaleDateString('fr-CA')
    ordenTuneada.fecha_del_instrumento = new Date(ordenTuneada.fecha_del_instrumento).toLocaleDateString('fr-CA')
    this.onCargarSolicitud.emit(ordenTuneada)
  }
  cancelar(){
    this.router.navigate(['/ordenes/listado'])
  }


}
