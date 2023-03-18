import { switchMap } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IProgenitor } from 'src/app/interfaces/iprogenitor';
import { ProgenitorService } from 'src/app/services/progenitor.service';
import { MatTableDataSource } from '@angular/material/table';
import { ITipoDocument } from 'src/app/interfaces/itipo-document';
import { MatDialog } from '@angular/material/dialog';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-progenitor',
  templateUrl: './form-progenitor.component.html',
  styleUrls: ['./form-progenitor.component.scss']
})
export class FormProgenitorComponent implements OnInit {

  tipoDocumentos: ITipoDocument[] = [];

  progenitor: IProgenitor = {
    apellido:'',
    segundo_apellido: null,
    nombre:'',
    otros_nombres: null,
    type_document_id:null,
    numero_de_documento:''
  }

  constructor(
    private progenitoresService:ProgenitorService,
    private tipoDocumentoService:TipoDocumentoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.params);
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.progenitoresService.getProgenitorId(id))
      ).subscribe((progenitor) =>{
         this.progenitor = progenitor
        }
    )
    this.tipoDocumentoService.getTipoDocumentos().subscribe((tipoDocumento)=>{
      this.tipoDocumentos = tipoDocumento
      // console.log(this.tipoDocumentos)
    })

  }

  guardar(){
    if(this.progenitor.nombre.trim().length === 0){
      return;
    }

    if(this.progenitor.id){

      this.progenitoresService.actualizarProgenitor(this.progenitor)
        .subscribe(progenitor => {
          console.log(progenitor)
          // this.mostrarMensaje('Registro Actualizado')
         this.router.navigate(['/progenitores'])
        })
    }else{

      this.progenitoresService.agregarProgenitor(this.progenitor)
      .subscribe(resp =>{
        console.log('Respuesta', resp)
      //  this.mostrarMensaje('Registro Creado')
         this.router.navigate(['/progenitores'])
      })
    }
  }

}
