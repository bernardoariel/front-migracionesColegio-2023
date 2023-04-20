import { PersonasService } from './../../services/personas.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenor } from 'src/app/interfaces/IMenor';
import { MenoresService } from 'src/app/services/menores.service';

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
   ////
   displayedColumns: string[] = ['apellido', 'nombre', 'numero_de_documento', 'acciones'];
   dataSource: any;
   menores:IMenor[] = []
   botones:boolean = false;
   botonSeleccionar:boolean = false;
   @Output() onSeleccionarMenor: EventEmitter<number> = new EventEmitter<number>();
   @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
   @ViewChild(MatSort,{static:true}) sort!: MatSort;

   constructor(     private menoresService:MenoresService,
     private router: Router,
     private activatedRoute:ActivatedRoute,
     private personasService: PersonasService,
     private matPaginatorIntl: MatPaginatorIntl) {
      this.matPaginatorIntl.itemsPerPageLabel = this.paginatorItems;
     }

   ngOnInit(): void {

     this.cargarMenores();

      /* this.activatedRoute.url.subscribe(url => {
       this.rutaActual = url.map(segment => segment.path).join('/');
       console.log(this.rutaActual); // Imprime la ruta actual como una cadena de texto cada vez que cambia
       if(this.rutaActual=='nueva' || this.rutaActual.includes('precarga')){
         this.botonSeleccionar = true
       }

       console.log("precarga desde listado",this.precarga)
     });   */ /* reviso si en la ruta existe la palabra nueva */


   }

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   cargarMenores(){
      this.personasService.getMenoresJoin().subscribe(
       (menores)=>{
        console.log('menores::: ', menores);
         this.menores = menores.filter(menor => menor.id !== 1);
         this.dataSource = new MatTableDataSource<IMenor>( this.menores );
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         console.log(this.menores);
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
