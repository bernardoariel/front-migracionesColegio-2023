import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IMenor } from 'src/app/interfaces/IMenor';
import { MenoresService } from 'src/app/services/menores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listado-menores',
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
  menores:IMenor[] = []
  botones:boolean = false;
  botonSeleccionar:boolean = false;
  @Output() onSeleccionarMenor: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;

  constructor(
    private menoresService:MenoresService,
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarMenores();

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

  cargarMenores(){

    this.menoresService.getMenoresFormateado().subscribe(
      (menores)=>{
        this.menores = menores.filter(menor => menor.id !== 1);
        this.dataSource = new MatTableDataSource<IMenor>( this.menores );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
    })

  }
  formMenor(id:number){

    if(!this.precarga){

      this.router.navigate(['menores/editar/'+id])
    }

  }

  asignarMenor(id:number){

    this.onSeleccionarMenor.emit(id)
  }


}
