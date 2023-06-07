import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProgenitor } from 'src/app/interfaces/iprogenitor';
import { ProgenitorService } from 'src/app/services/progenitor.service';


@Component({
  selector: 'app-progenitor-listado',
  templateUrl: './progenitor-listado.component.html',
  styleUrls: ['./progenitor-listado.component.scss']
})
export class ProgenitorListadoComponent implements OnInit {

  displayedColumns: string[] = ['apellido', 'nombre','numero_de_documento', 'acciones'];
  dataSource: any;
  progenitores:IProgenitor[] = []

  @Output() onSeleccionarProgenitor: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private progenitoresService:ProgenitorService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarProgenitores();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarProgenitores(){
    this.progenitoresService.getProgenitores().subscribe(
      (progenitor)=>{
        this.progenitores = progenitor
        this.dataSource = new MatTableDataSource<IProgenitor>( this.progenitores );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
    })

  }
  formMenor(id:number){
    this.router.navigate(['progenitores/editar/'+id])
  }

  asignarProgenitor(id:number){
    this.onSeleccionarProgenitor.emit(id)
  }



}
