import { AcompaneantesService } from './../../services/acompaneantes.service';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { IProgenitor } from 'src/app/interfaces/iprogenitor';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProgenitorService } from '../../services/progenitor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-acompaneantes',
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
  @Output() onSeleccionarAcompaneante: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private acompaneantesService:AcompaneantesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarProgenitores();

      /* reviso si en la ruta existe la palabra nueva */
      this.activatedRoute.url.subscribe(url => {

        this.rutaActual = url.map(segment => segment.path).join('/');
        console.log(this.rutaActual); // Imprime la ruta actual como una cadena de texto cada vez que cambia
        if(this.rutaActual=='nueva' || this.rutaActual.includes('precarga')){
          this.botonSeleccionar = true
        }
        console.log("precarga desde listado",this.precarga)

      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    cargarProgenitores(){
      this.acompaneantesService.getProgenitores().subscribe(
        (progenitor)=>{
          this.progenitores = progenitor
          this.dataSource = new MatTableDataSource<IProgenitor>( this.progenitores );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("progenitores",this.progenitores);
      })

    }
    formMenor(id:number){
      this.router.navigate(['acompaneantes/editar/'+id])
    }

    asignarProgenitor(id:number){
      this.onSeleccionarAcompaneante.emit(id)
    }
    crearProgenitor(){
      this.router.navigate(['./acompaneantes/agregar'])
    }
}
