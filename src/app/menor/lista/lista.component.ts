import { PersonasService } from './../../services/personas.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersona } from 'src/app/interfaces/IPersona';
import { MenorComponent } from '../menor/menor.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-menor',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @ViewChild('menor') menor!: MenorComponent;
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
   @Output() onSeleccionarMenor: EventEmitter<IPersona> = new EventEmitter<IPersona>();
   @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
   @ViewChild(MatSort,{static:true}) sort!: MatSort;

   constructor(
     private personasService: PersonasService,
     private matPaginatorIntl: MatPaginatorIntl,
     private activatedRoute: ActivatedRoute,
     private dialog: MatDialog
     ) {
      this.matPaginatorIntl.itemsPerPageLabel = this.paginatorItems;
     }

   ngOnInit(): void {

    /* reviso si en la ruta existe la palabra nueva */
    this.activatedRoute.url.subscribe(url => {

      this.rutaActual = url.map(segment => segment.path).join('/');
      
      if(this.rutaActual=='nueva' || this.rutaActual.includes('solicitudes')){
        this.precarga = true
      }

    });

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
         
     })

   }


   asignarMenor(menor:IPersona){

     this.onSeleccionarMenor.emit(menor)
   }
   nuevaPersona(){

    const modalMenor = this.dialog.open(MenorComponent,{
      width: '70vw', // Ancho personalizado
      disableClose: true ,
      data: {
        modal:{
          tipoDialogo:'menor',
          accionModal:'agregar'
        }
      }
    })

    modalMenor.afterClosed().subscribe(()=>{
        this.cargarMenores()
    })

  }
  seleccionarMenor(menor:IPersona){
    
    const modalMenor = this.dialog.open(MenorComponent,{
      width: '70vw',
      disableClose: true ,
      data:{
        menor:menor,
        modal:{
          tipoDialogo:'menor',
          accionModal:'editar'
        }
      }
    })
    modalMenor.afterClosed().subscribe((menor:IPersona)=>{
      this.cargarMenores()
    })
  }

  reload(){
    this.cargarMenores()
  }

}
