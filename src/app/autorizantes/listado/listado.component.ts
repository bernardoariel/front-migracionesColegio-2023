import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IAutorizante } from 'src/app/interfaces/IAutorizante';
import { AutorizantesService } from 'src/app/services/autorizantes.service';



@Component({
  selector: 'app-listado-autorizante',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  // esto es para tomar la ruta actual y crear una variable del tipo boolean
  rutaActual: string ='';
  precarga: boolean = false;
  ////
  displayedColumns: string[] = ['apellido', 'nombre', 'numero_de_documento', 'acciones'];
  dataSource: any;
  autorizantes:IAutorizante[] = []
  botonSeleccionar:boolean = false;
  @Output() onSeleccionarAutorizante: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private autoriantesService:AutorizantesService,
    private router: Router,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {

    this.cargarAutorizantes();

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
  cargarAutorizantes(){
    this.autoriantesService.getAutorizantesFormateado().subscribe(
      (autorizantes)=>{
        this.autorizantes = autorizantes
        this.dataSource = new MatTableDataSource<IAutorizante>( this.autorizantes );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.autorizantes);
      }
    )
  }

  formAutorizante(id:number){
    this.router.navigate(['autorizantes/editar/'+id])
  }

  asignarAutorizante(id:number){
    this.onSeleccionarAutorizante.emit(id)
  }
  crearAutorizante(){
    this.router.navigate(['./autorizantes/agregar'])
  }

}
