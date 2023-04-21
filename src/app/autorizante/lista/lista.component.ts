import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPersona } from 'src/app/interfaces/IPersona';
import { PersonasService } from 'src/app/services/personas.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {


  titulo:string = 'Listado de Autorizantes';
  paginatorItems:string = 'Autorizantes por página';
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
    // colocar el foco en el input del apellido con un metodo de angularmaterial



   }

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   cargarMenores(){
      this.personasService.getPersonasJoin().subscribe(
       (personas)=>{

         this.personas = personas.filter(persona => persona.id !== 1);
         this.dataSource = new MatTableDataSource<IPersona>( this.personas );
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;

     })

   }
   formPersona(id:number){

     if(!this.precarga){
       this.router.navigate(['/autorizantes/editar/'+id])
     }

   }

   asignarMenor(id:number){

     this.onSeleccionarMenor.emit(id)
   }

}
