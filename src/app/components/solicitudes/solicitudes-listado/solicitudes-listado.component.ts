import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdenFormateada } from 'src/app/interfaces/orden-formateada';
import { OrdenesService } from '../../../services/ordenes.service';
import { SoapService } from '../../../services/soap.service';

@Component({
  selector: 'app-solicitudes-listado',
  templateUrl: './solicitudes-listado.component.html',
  styleUrls: ['./solicitudes-listado.component.scss']
})
export class SolicitudesListadoComponent implements OnInit {

  displayedColumns: string[] = ['fecha_del_instrumento', 'apellido','nro_foja','numero_actuacion_notarial_cert_firma','serie_foja','tipo_foja','aprobacion','acciones'];
  dataSource: any;
  ordenes:OrdenFormateada[] = [];
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private ordenesService:OrdenesService,
    private router:Router, private soapService:SoapService) {
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.cargarOrdenes()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarOrdenes(){

    this.ordenesService.getOrdenesFormateado()
   .subscribe(
      (ordenes)=>{
        
        // (ordenes.aprobacion)? ordenes.aprobacion = ordenes.aprobacion : ordenes.aprobacion= '';
        // const ordenFiltrada = ordenes.aprobacion ?? ''



        this.ordenes = ordenes

        this.dataSource = new MatTableDataSource<OrdenFormateada>( this.ordenes );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
    })

  }
  autorizarSoap(valor:number){
    this.soapService.aprobarSoap(valor).subscribe(
    resp =>{

          // this.router.navigate(['/solicitudes'])
          this.cargarOrdenes()
        //this.mostrarMensaje('Registro Creado')

      })

  }
  editarSolicitud(id:number){
    this.router.navigate(['/solicitudes'])
  }

}
