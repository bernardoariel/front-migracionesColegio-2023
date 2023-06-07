import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EscribanosService } from 'src/app/services/escribanos.service';
import { Escribano } from 'src/app/interfaces/escribano';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido','matricula', 'email', 'habilitado','acciones'];
  dataSource: any;
  escribanos:Escribano[] = []

  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private escribanoService:EscribanosService,
    private router: Router){
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  ngOnInit(): void {

    this.cargarEscribanos();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEscribanos(){

    this.escribanoService.getEscribanos().subscribe(
      (escribanos)=>{

        this.escribanos = escribanos
        this.dataSource = new MatTableDataSource<Escribano>( this.escribanos );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    )

  }

  formEscribano(id:number){

    this.router.navigate(['escribanos/editar/'+id])
  }
}



