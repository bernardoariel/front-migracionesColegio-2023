
import { Component, OnInit } from '@angular/core';



import { Router, ActivatedRoute } from '@angular/router';
import { IOrdenPersonas } from 'src/app/interfaces/IOrden-personas';
import { IOrdenDatos } from 'src/app/interfaces/IOrden-datos';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { IOrden } from 'src/app/interfaces/IOrden';
import { MenoresService } from '../../services/menores.service';
import { AutorizantesService } from '../../services/autorizantes.service';
import { ProgenitorService } from 'src/app/services/progenitor.service';
import { OrdenesItemsService } from '../../services/ordenes-items.service';
import { AcompaneantesService } from '../../services/acompaneantes.service';
import { shareReplay, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  private nombresProgenitores: {[key: number]: string} = {};
  private nombresAcompaneantes: {[key: number]: string} = {};
  templateMenor:boolean = false;
  templateAutorizante1:boolean = false;
  templateAutorizante2:boolean = false;
  templateProgenitor:boolean = false;
  templateAcompaneante:boolean = false;
  progenitorSeleccionado:number = 1;
  solicitud: any[]=[]

  titulo:string = 'Creacion de una Nueva Solicitud'
  miOrdenPersonas:IOrdenPersonas ={
    notary_id:Number(localStorage.getItem('userId')),
    minor_id: null,
    acompaneante1_id: null,
    acompaneante2_id:  null,
    progenitores: [] ,
    acompaneantes:[]
  }
  arrayRecorrer:number[] = []

  miOrdenDatos:IOrdenDatos ={
    aprobacion:null,
    numero_actuacion_notarial_cert_firma:'',
    cualquier_pais:'',
    serie_foja:'',
    tipo_foja:null,
    vigencia_hasta_mayoria_edad:'',
    fecha_vigencia_desde:'',
    fecha_vigencia_hasta:'',
    fecha_del_instrumento:'',
    instrumento:'',
    nro_foja:'',
    paises_desc:'',
  }
  estado!:string;
  orden!:IOrden
  nombreMenor:string =''
  nombreAutorizante1:string = ''
  nombreAutorizante2:string = ''
  nombreProgenitor1:string = ''
  nombreProgenitor2:string = ''
  viajaSolo:boolean = true;
  mayoriaEdad:number = 21;
  btnSolicitud: boolean = true;
  fechaMayorEdad!: Date | undefined | String;
  selectedIndex: any;

  tabActive(event: { index: any; }) {
    // obtenemos el index del tab
    console.log(event.index);
    // actualizamos el index seleccionado
    this.selectedIndex = event.index;
    // this.cargarArrayARecorrer()
  }
  cargarArrayARecorrer(){
    this.arrayRecorrer = this.miOrdenPersonas.progenitores.slice().concat(this.miOrdenPersonas.acompaneantes.slice());
  }
  constructor(
    private ordenesService:OrdenesService,
    private router:Router,
    private menoresService:MenoresService,
    private autorizantesService:AutorizantesService,
    private progenitorService:ProgenitorService,
    private activatedRoute:ActivatedRoute,
    private ordenesItemsService:OrdenesItemsService,
    private acompaneantesService: AcompaneantesService
    ) {


    }

  ngOnInit(): void {
    console.log("prognitor _>"+this.progenitorSeleccionado)

    this.activatedRoute.params.subscribe((params) => {

      if (params.hasOwnProperty('id')) {
        // El objeto params tiene un parámetro 'id'
        console.log('estoy con los ', params)
        // this.orden = {};
        // this.orden.id = params['id'];
        this.estado = 'edit';
        this.ordenesService.getOrdenId(Number(params['id'])).subscribe(
          (nuevaOrden) => {
            this.titulo = `Editando la solicitud con numero de Foja: ${nuevaOrden.nro_foja}`
            this.agregarNuevoMenor( nuevaOrden.minor_id! )
            this.miOrdenPersonas.notary_id = nuevaOrden.notary_id
            this.miOrdenPersonas.minor_id = nuevaOrden.minor_id
            this.miOrdenDatos.numero_actuacion_notarial_cert_firma = nuevaOrden.numero_actuacion_notarial_cert_firma
            this.miOrdenDatos.cualquier_pais = nuevaOrden.cualquier_pais
            this.miOrdenDatos.fecha_del_instrumento = nuevaOrden.fecha_del_instrumento
            this.miOrdenDatos.fecha_vigencia_desde = nuevaOrden.fecha_vigencia_desde
            this.miOrdenDatos.fecha_vigencia_hasta = nuevaOrden.fecha_vigencia_hasta
            this.miOrdenDatos.nro_foja = nuevaOrden.nro_foja
            this.miOrdenDatos.paises_desc = nuevaOrden.paises_desc
            this.miOrdenDatos.serie_foja = nuevaOrden.serie_foja
            this.miOrdenDatos.tipo_foja = nuevaOrden.tipo_foja
            this.miOrdenDatos.instrumento = nuevaOrden.instrumento
            this.miOrdenDatos.vigencia_hasta_mayoria_edad = nuevaOrden.vigencia_hasta_mayoria_edad
            /* cargar los items de las ordenes */
            this.ordenesItemsService.getOrdenId(nuevaOrden.id!).subscribe(
                (respuesta) => {
                  // console.log("-->",respuesta)
                  for (const item of respuesta) {
                      console.log('-item-',item)

                      if(item.nombre_tabla == "notaries") this.miOrdenPersonas.notary_id = item.id_detalle

                      if(item.nombre_tabla == "authorizations"){

                        if(this.miOrdenPersonas.acompaneante1_id===null){
                          console.log('auth1')
                          this.agregarAutorizante1(item.id_detalle)

                        }else{
                          console.log('auth2')
                          this.agregarAutorizante2(item.id_detalle)

                        }

                      }

                      if(item.nombre_tabla == "other_parents"){

                        this.miOrdenPersonas.progenitores?.push(item.id_detalle)

                      }
                      if(item.nombre_tabla == "persons"){

                        this.miOrdenPersonas.acompaneantes?.push(item.id_detalle)

                      }

                    }
                  }

                );
              });

      } else {
        // El objeto params no tiene un parámetro 'id'
        console.log('El parámetro id no está presente');
        this.estado = 'create';
      }

    });
  }

  validarCualquierPais(solicitud: IOrdenDatos) {

    if (solicitud.cualquier_pais === 'y') {
      solicitud.paises_desc="."
      return true;
    } else {
      return solicitud.paises_desc !== "";
    }
  }

  comprobarSolicitud(solicitud1: IOrdenDatos, solicitud2: IOrdenPersonas) {
    const claves1 = Object.keys(solicitud1).slice(1);
    const valores1 = claves1.map(clave => solicitud1[clave]);
    const claves2 = Object.keys(solicitud2).slice(0, 3);
    const valores2 = claves2.map(clave => solicitud2[clave]);
    return valores1.every(valor => this.validarCualquierPais(solicitud1) && valor !== "" && valor !== null) && valores2.every(valor => valor !== null && valor !== undefined);
  }

  agregarNuevoMenor( menor: number){


    this.miOrdenPersonas.minor_id = menor;
    console.log(this.miOrdenPersonas)

    /* slecciono el menor */
    this.menoresService.getMenorId(menor).subscribe(
      (respuesta)=>{

        this.nombreMenor = `${respuesta.apellido}
                            ${(respuesta.segundo_apellido!=null)? respuesta.segundo_apellido: ''}
                            ${respuesta.nombre} ${(respuesta.otros_nombres!=null)? respuesta.otros_nombres : ''}`
                            console.log(respuesta.fecha_de_nacimiento)
        const fechaNacimiento = new Date(respuesta.fecha_de_nacimiento);
        this.fechaMayorEdad = new Date(fechaNacimiento.getFullYear() + this.mayoriaEdad, fechaNacimiento.getMonth(), fechaNacimiento.getDate());
        this.fechaMayorEdad  = this.fechaMayorEdad.toISOString().substring(0, 10);

      }
    )

  }
    agregarAutorizante1(autorizante:number){

      console.log("este es el autorizante1 : ",autorizante)
      this.miOrdenPersonas.acompaneante1_id = autorizante;
      /* selecciono el primer acompañante */
      this.autorizantesService.getAutorizanteId(autorizante).subscribe(
        (respuesta)=>{

            this.nombreAutorizante1 = `${respuesta.apellido}
                            ${(respuesta.segundo_apellido!=null)? respuesta.segundo_apellido: ''}
                            ${respuesta.nombre} ${(respuesta.otros_nombres!=null)? respuesta.otros_nombres : ''}`
        }
    )
    }

    agregarAutorizante2(autorizante:number){

      console.log("este es el autorizante2 : ",autorizante)
      this.miOrdenPersonas.acompaneante2_id = autorizante;
      /* selecciono el primer acompañante */
      this.autorizantesService.getAutorizanteId(autorizante).subscribe(
        (respuesta)=>{

          this.nombreAutorizante2 = `${respuesta.apellido}
                              ${(respuesta.segundo_apellido!=null)? respuesta.segundo_apellido: ''}
                              ${respuesta.nombre} ${(respuesta.otros_nombres!=null)? respuesta.otros_nombres : ''}`
        }
      )
    }
    agregarProgenitor(progenitor:number,i: number){

      this.miOrdenPersonas.progenitores.push(progenitor);


      this.cargarArrayARecorrer()
    }

    traerNombreProgenitor(progenitor: number) {
      if (this.nombresProgenitores[progenitor]) {
        return of(this.nombresProgenitores[progenitor]);
      } else {
        return this.progenitorService.getProgenitorId(progenitor).pipe(
          map(pro => `${pro.apellido} ${pro.nombre}`),
          catchError(() => of('Nombre y apellido desconocidos')),
          tap(nombre => this.nombresProgenitores[progenitor] = nombre),
          shareReplay(1)
        );
      }
    }
    traerNombreAcompaneante(acompanenante: number) {
      if (this.nombresAcompaneantes[acompanenante]) {
        return of(this.nombresAcompaneantes[acompanenante]);
      } else {
        return this.acompaneantesService.getProgenitorId(acompanenante).pipe(
          map(pro => `${pro.apellido} ${pro.nombre}`),
          catchError(() => of('Nombre y apellido desconocidos')),
          tap(nombre => this.nombresAcompaneantes[acompanenante] = nombre),
          shareReplay(1)
        );
      }
    }

    eliminarProgenitor(i: number) {
      this.miOrdenPersonas.progenitores.splice(i, 1);
      delete this.nombresProgenitores[i];
    }
    eliminarAcompanenante(i: number) {
      this.miOrdenPersonas.acompaneantes.splice(i, 1);
      delete this.nombresAcompaneantes[i];
    }
    eliminarMenor() {
      this.nombreMenor = '';
      this.miOrdenPersonas.minor_id = null;
    }
    eliminarAutorizante(i:number) {
      if(i==1){
        this.nombreAutorizante1 = '';
        this.miOrdenPersonas.acompaneante1_id = null;
      }else{
        this.nombreAutorizante2 = '';
        this.miOrdenPersonas.acompaneante2_id = null;
      }

    }





    agregarAcompaneante(acompaneante:number,i: number){

      this.miOrdenPersonas.acompaneantes.push(acompaneante);
      /* selecciono el primer acompañante */

      this.cargarArrayARecorrer()
    }
    actualizarSolicitud(orden:IOrdenDatos){
      this.miOrdenDatos = orden;
      console.log('this.miOrdenDatos::: ', this.miOrdenDatos);
      console.log('this.miOrdenPersonas::: ', this.miOrdenPersonas);
      console.log('esouyt viendo',this.comprobarSolicitud(this.miOrdenDatos,this.miOrdenPersonas))
      this.btnSolicitud = !this.comprobarSolicitud(this.miOrdenDatos,this.miOrdenPersonas);
    }
    crearOtroAcompaneante(){
      this.arrayRecorrer.push(0)
      // this.cargarArrayARecorrer()
    }

    crearOrden(){

      console.log(this.miOrdenDatos)

      this.orden = { ...this.miOrdenPersonas , ...this.miOrdenDatos} ;

      this.activatedRoute.params.subscribe((params) => {

        if (params.hasOwnProperty('id')) {
          this.orden.id= Number(params['id'])
          this.ordenesService.actualizarOrden(this.orden).subscribe(resp=>{
            console.log('Respuesta', resp)
            this.router.navigate(['/ordenes/listado'])
          })
        }
        else{
          this.ordenesService.agregarOrden(this.orden)
          .subscribe(resp =>{
            console.log(this.orden)
            console.log('Respuesta', resp)
            //  this.mostrarMensaje('Registro Creado')
            this.router.navigate(['/ordenes/listado'])
          })
        }

    })


    }

    cancelar(){
      this.router.navigate(['/ordenes/listado'])
    }
    mostrarTemplateMenor(){
      console.log('emit')
      this.templateMenor = !this.templateMenor
    }

    mostrarTemplateAutorizante1(){
      console.log('emit')
      this.templateAutorizante1 = !this.templateAutorizante1
    }

    mostrarTemplateAutorizante2(){
      console.log('emit')
      this.templateAutorizante2 = !this.templateAutorizante2
    }

    mostrarTemplateProgenitor(){
      console.log('emit - progenitor')
      console.log(this.templateProgenitor)
      console.log('--------------------')
      this.templateProgenitor = !this.templateProgenitor
      console.log(this.templateProgenitor)
    }
    mostrarTemplateAcompaneante(){
      console.log('emit - acompaneante')
      console.log(this.templateAcompaneante)
      console.log('--------------------')
      this.templateAcompaneante = !this.templateAcompaneante
      console.log(this.templateAcompaneante)
    }

    cambiarValorViajaSolo() {
      this.viajaSolo = !this.viajaSolo;
    }
}
