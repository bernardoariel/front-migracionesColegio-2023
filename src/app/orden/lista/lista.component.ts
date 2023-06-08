import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map,  switchMap, filter, forkJoin, of, tap } from 'rxjs';

import { OrdenFormateada } from 'src/app/interfaces/orden-formateada';
import { EscribanosService } from 'src/app/services/escribanos.service';
import { OrdenesItemsService } from 'src/app/services/ordenes-items.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { PdfService } from 'src/app/services/pdf.service';
import { PersonasService } from 'src/app/services/personas.service';
import { SoapService } from 'src/app/services/soap.service';

interface QR{
  nro_foja: string;
  fechahastacuando: string,
  aprobacion: string,
  escribano: Escribano
  menor: Menor
  autorizante: Autorizante[]
  acompaneante:Acompaneante[]
}
interface Escribano{
  matricula:string,
  apellidoescribano:string,
  nombreescribano:string,
}
interface Menor{
  apellidomenor:string,
  nombremenor: string | undefined;
  nrodocumento:number | undefined;
  nacionalidad:number | undefined;
  fechanacimiento:string | null;
}

interface Autorizante{
  apellidoautorizante:string | null;
  nombreautorizante:string | null;
  nrodocumentoautorizante:number | undefined;
}

interface Acompaneante{
  apellidoacompaneante:string | null;
  nombreacompaneante:string | null;
  nrodocumentoacompaneante:number | undefined;  
}
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  loading = false;
  displayedColumns: string[] = ['apellidoescribano','fecha_del_instrumento',
   'apellido','numero_actuacion_notarial_cert_firma','aprobacion','editar','pdf','autorizar','boton1','boton2'];
  dataSource: any;
  ordenes:OrdenFormateada[] = [];
  userId:number;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;
  respuesta!: QR
  constructor(
    private ordenesService:OrdenesService,
    private router:Router,
    private soapService:SoapService,
    private pdfService: PdfService,
    private escribanosService:EscribanosService,
    private personasService:PersonasService,
    private ordenesItemsService:OrdenesItemsService) {

      this.userId = Number(localStorage.getItem('userId'));
      

    }

    ngOnInit(): void {
      this.cargarOrdenes()
    }
    
  crearPdf(id: number) {
    this.ordenesService.getOrdenId(id).pipe(
      tap((orden) => {
        console.log('orden::: ', orden);
        this.respuesta = {
          nro_foja: orden.nro_foja,
          fechahastacuando: orden.fecha_vigencia_hasta,
          aprobacion: orden.aprobacion as string,
          escribano: {
            matricula: '', // Se llenará más adelante
            apellidoescribano: '',
            nombreescribano: '',
          },
          menor: {
            apellidomenor: '',
            nombremenor: '',
            nrodocumento: undefined,
            nacionalidad: undefined,
            fechanacimiento: null,
          },
          autorizante: [],
          acompaneante: [],
        };
      }),
      switchMap((orden) => {
        return this.ordenesItemsService.getOrdenId(id);
      }),
      tap((items) => {
        console.log('items::: ', items);
      }),
     switchMap((items: any[]) => {
  const escribanoId = items[0]?.id_detalle;
  const menorId = items[1]?.id_detalle;
  const autorizanteIds = items
    .filter((item: { tipo: string }) => item.tipo === 'autorizante')
    .map((item: { id_detalle: any }) => item.id_detalle);

  const escribanoObservable = escribanoId ? this.escribanosService.getEscribanoId(escribanoId) : of(null);
  const menorObservable = menorId ? this.personasService.getPersonaById(menorId) : of(null);
  const autorizantesObservables = autorizanteIds.map((id: number) => this.personasService.getPersonaById(id));

  return forkJoin([
    escribanoObservable,
    menorObservable,
    ...autorizantesObservables,
  ]).pipe(
    map(([escribano, menor, ...autorizantes]: [any, any, ...any[]]) => {
      return { escribano, menor, autorizantes };
    })
  );
}),
tap(({ escribano, menor, autorizantes }) => {
  console.log('escribano::: ', escribano);
  console.log('menor::: ', menor);
  console.log('autorizantes::: ', autorizantes);

  // Asignar valores de escribano y menor a this.respuesta

  this.respuesta.escribano = {
    matricula: escribano?.matricula,
    apellidoescribano: escribano?.apellido,
    nombreescribano: escribano?.nombre
  };

  this.respuesta.menor = {
    apellidomenor: menor?.apellido,
    nombremenor: menor?.nombre,
    nrodocumento: menor?.numero_de_documento,
    nacionalidad: menor?.nacionalidad,
    fechanacimiento: menor?.fecha_nacimiento,
  };

  autorizantes.forEach((autorizante) => {
    this.respuesta.autorizante.push({
      apellidoautorizante: autorizante?.apellido,
      nombreautorizante: autorizante?.nombre as string,
      nrodocumentoautorizante: autorizante?.numero_de_documento as number,
    });
  });
}),
    ).subscribe((respuesta) => {
        console.log('respuesta:::', respuesta);
        console.log('this.respuesta::: ', this.respuesta);
    });
  }

/* switchMap(() => this.personasService.getPersonaById(41)), //autorizante
      tap((acompaneante)=>{
        this.respuesta.acompaneante.push({
        apellidoacompaneante: acompaneante.apellido,
        nombreacompaneante: acompaneante.nombre as string,
        nrodocumentoacompaneante: acompaneante.numero_de_documento as number,
        });
      }), */

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    cargarOrdenes() {
      this.ordenesService.getOrdenesFormateado().subscribe((ordenes) => {
        
        if(this.userId!==1){

          this.ordenes = ordenes.filter((orden) => orden.notary_id === this.userId);

        }else{

          this.ordenes =  ordenes.filter((orden) => orden.minor_id != this.userId);

        }
        this.dataSource = new MatTableDataSource<OrdenFormateada>(this.ordenes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    eliminarOrden(id:number){
      this.ordenesService.eliminarOrden(id).subscribe((respuesta)=>{
        
        // this.router.navigate(['/'])
        this.cargarOrdenes()
      })
    }

    duplicar(id:number){
      this.ordenesService.duplicateOrdenId(id).subscribe(
        (respuesta)=>{
          
          // this.router.navigate(['/'])
          this.cargarOrdenes()
        }
      )
    }

    autorizarSoap(valor:number){
      this.loading = true;
      this.soapService.aprobarSoap(valor).subscribe(
        resp => {
          
          // this.router.navigate(['/']);
          this.cargarOrdenes()
          this.loading = false;
        },
        error => {
          
          this.loading = false;
        },
        () => {
          
          this.cargarOrdenes();
          // this.router.navigate(['/ordenes/listado']);
          this.loading = false;
        }
      );
    }
    // this.router.navigate(['/ordenes/listado']);

    editarSolicitud(id:number){
      this.router.navigate(['/precargas/precarga/'+id])
    }

}
