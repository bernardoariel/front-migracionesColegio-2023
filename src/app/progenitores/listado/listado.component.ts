import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IProgenitor } from 'src/app/interfaces/iprogenitor';
import { ProgenitorService } from 'src/app/services/progenitor.service';

@Component({
  selector: 'app-listado-progenitores',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // esto es para tomar la ruta actual y crear una variable del tipo boolean
  rutaActual: string ='';
  precarga: boolean = false;
  ////
  displayedColumns: string[] = ['apellido', 'nombre','numero_de_documento', 'acciones'];
  dataSource: any;
  progenitores:IProgenitor[] = []
  botonSeleccionar:boolean = false;
  @Output() onSeleccionarProgenitor: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private progenitoresService:ProgenitorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProgenitores();

    /* reviso si en la ruta existe la palabra nueva */
    this.activatedRoute.url.subscribe(url => {

      this.rutaActual = url.map(segment => segment.path).join('/');
      
      if(this.rutaActual=='nueva' || this.rutaActual.includes('precarga')){
        this.botonSeleccionar = true
      }
      

    });
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
  crearProgenitor(){
    this.router.navigate(['./progenitores/agregar'])
  }

}
