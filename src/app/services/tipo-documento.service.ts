import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { INacionalidad } from '../interfaces/INacionalidad';
import { ITipoDocument } from '../interfaces/ITipo-document';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http:HttpClient ) { }

  getTipoDocumentos(): Observable<ITipoDocument[]>{
    
    return this.http.get<ITipoDocument[]>(`${ this.baseUrl }/tiposdocumentos`);
  }

  getTipoDocumentosId(id:number):Observable<ITipoDocument>{
    
    return this.http.get<ITipoDocument>(`${ this.baseUrl }/tiposdocumentos/${id}`)
  }
}
