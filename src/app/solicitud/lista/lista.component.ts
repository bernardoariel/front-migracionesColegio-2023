import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdenFormateada } from 'src/app/interfaces/orden-formateada';
import { EscribanosService } from 'src/app/services/escribanos.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { PdfService } from 'src/app/services/pdf.service';
import { SoapService } from 'src/app/services/soap.service';

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
  constructor(
    private ordenesService:OrdenesService,
    private router:Router,
    private soapService:SoapService,
    private pdfService: PdfService,
    private escribanosService:EscribanosService) {

      this.userId = Number(localStorage.getItem('userId'));
      console.log(this.userId )

    }

    ngOnInit(): void {
      this.cargarOrdenes()
    }
    crearPdf(id:number){
      this.pdfService.imprimirPDF(id);
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    cargarOrdenes() {
      this.ordenesService.getOrdenesFormateado().subscribe((ordenes) => {
        console.log('estas son las ordenes', ordenes);
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
        console.log(respuesta)
        // this.router.navigate(['/'])
        this.cargarOrdenes()
      })
    }

    duplicar(id:number){
      this.ordenesService.duplicateOrdenId(id).subscribe(
        (respuesta)=>{
          console.log(respuesta)
          // this.router.navigate(['/'])
          this.cargarOrdenes()
        }
      )
    }

    autorizarSoap(valor:any){
      valor.loading = true;
      this.soapService.aprobarSoap(valor).subscribe(
        resp => {
          console.log("estoy respondiendo al autorizar "+ resp)
          // this.router.navigate(['/']);
          this.cargarOrdenes()
          valor.loading = false;
        },
        error => {
          console.log("Se produjo un error al autorizar: ", error);
          valor.loading = false;
        },
        () => {
          console.log("La petición de autorización ha finalizado.");
          this.cargarOrdenes();
          // this.router.navigate(['/ordenes/listado']);
          valor.loading = false;
        }
      );
    }
    // this.router.navigate(['/ordenes/listado']);

    editarSolicitud(id:number){
      this.router.navigate(['/precargas/precarga/'+id])
    }

}
