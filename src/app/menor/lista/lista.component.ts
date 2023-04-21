import { PersonasService } from './../../services/personas.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersona } from 'src/app/interfaces/IPersona';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {


  titulo:string = 'Listado de Menores';
  paginatorItems:string = 'Menores por página';
   // esto es para tomar la ruta actual y crear una variable del tipo boolean
   rutaActual: string ='';
   precarga: boolean = false;

   displayedColumns: string[] = ['apellido', 'nombre', 'numero_de_documento', 'acciones'];
   dataSource: any;
   personas:IPersona[] = []
   botones:boolean = false;
   botonSeleccionar:boolean = false;
   @Output() onSeleccionarMenor: EventEmitter<number> = new EventEmitter<number>();
   @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
   @ViewChild(MatSort,{static:true}) sort!: MatSort;

   constructor(
     private router: Router,
     private personasService: PersonasService,
     private matPaginatorIntl: MatPaginatorIntl
     ) {
      this.matPaginatorIntl.itemsPerPageLabel = this.paginatorItems;
     }

   ngOnInit(): void {

     this.cargarMenores();

   }

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   cargarMenores(){
      this.personasService.getMenoresJoin().subscribe(
       (menores)=>{

         this.personas = menores.filter(menor => menor.id !== 1);
         this.dataSource = new MatTableDataSource<IPersona>( this.personas );
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         console.log(this.personas);
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
