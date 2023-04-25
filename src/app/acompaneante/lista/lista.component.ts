
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersona } from 'src/app/interfaces/IPersona';
import { PersonasService } from 'src/app/services/personas.service';
import { AcompaneanteComponent } from '../acompaneante/acompaneante.component';
import { MatDialog } from '@angular/material/dialog';
import { AutorizanteComponent } from 'src/app/autorizante/autorizante/autorizante.component';

@Component({
  selector: 'app-lista-acompaneante',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  @ViewChild('acompaneante') acompaneante!: AcompaneanteComponent;

  titulo:string = 'Listado de Acompañantes';
  paginatorItems:string = 'Acompañantes por página';
   // esto es para tomar la ruta actual y crear una variable del tipo boolean
   rutaActual: string ='';
   precarga: boolean = false;

   displayedColumns: string[] = ['apellido', 'nombre', 'numero_de_documento', 'acciones'];
   dataSource: any;
   personas:IPersona[] = []
   botones:boolean = false;
   botonSeleccionar:boolean = false;
   @Output() onSeleccionarAcompaneante: EventEmitter<IPersona> = new EventEmitter<IPersona>();
   @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
   @ViewChild(MatSort,{static:true}) sort!: MatSort;

   constructor(
     private personasService: PersonasService,
     private matPaginatorIntl: MatPaginatorIntl,
     private activatedRoute: ActivatedRoute,
     private dialog: MatDialog,
     ) {
      this.matPaginatorIntl.itemsPerPageLabel = this.paginatorItems;
     }

   ngOnInit(): void {
    /* reviso si en la ruta existe la palabra nueva */
    this.activatedRoute.url.subscribe(url => {

      this.rutaActual = url.map(segment => segment.path).join('/');
      console.log(this.rutaActual); // Imprime la ruta actual como una cadena de texto cada vez que cambia
      if(this.rutaActual=='nueva' || this.rutaActual.includes('solicitudes')){
        this.precarga = true
      }

    });
     this.cargarMenores();
    // colocar el foco en el input del apellido con un metodo de angularmaterial

   }

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   cargarMenores(){
      this.personasService.getPersonasAcompaneantesJoin().subscribe(
       (personas)=>{
        console.log('personas::: ', personas);

         this.personas = personas.filter(persona => persona.id !== 1);
         this.dataSource = new MatTableDataSource<IPersona>( this.personas );
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;

     })

   }

   asignarAcompaneante(acompanenante:IPersona){
     this.onSeleccionarAcompaneante.emit(acompanenante)
   }

   nuevaPersona(){

    const modalMenor = this.dialog.open(AcompaneanteComponent,{
      width: '70vw', // Ancho personalizado
      disableClose: true ,
      data: {
        modal:{
          tipoDialogo:'acompaneante',
          accionModal:'agregar'
        }
      }
    })

    modalMenor.afterClosed().subscribe(()=>{
        this.cargarMenores()
    })

  }
  seleccionarAcompanenante(acompanenante:IPersona){
    console.log('acompanenante::: ', acompanenante);

    const modalMenor = this.dialog.open(AcompaneanteComponent,{
      width: '70vw',
      disableClose: true ,
      data:{
        persona:acompanenante,
        modal:{
          tipoDialogo:'acompaneante',
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
