import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdenFormateada } from 'src/app/interfaces/orden-formateada';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { SoapService } from 'src/app/services/soap.service';
import { PdfService } from '../../services/pdf.service';
import { EscribanosService } from '../../services/escribanos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = ['apellidoescribano','fecha_del_instrumento',
   'apellido','numero_actuacion_notarial_cert_firma','aprobacion','editar','pdf','autorizar','boton1','boton2'];
  dataSource: any;
  ordenes:OrdenFormateada[] = [];
  userId:number;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;
  constructor(
    private ordenesService:OrdenesService,
    private router:Router,
    private soapService:SoapService,
    private pdfService: PdfService,
    private escribanosService:EscribanosService) {

      this.userId = Number(localStorage.getItem('userId'));
      

    }

    ngOnInit(): void {
      this.cargarOrdenes()
    }
    crearPdf(id:number){
      let respuesta:any
      this.pdfService.imprimirPDF(id,respuesta);
    }

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
