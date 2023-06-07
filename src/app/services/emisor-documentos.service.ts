import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IEmisorDocumentos } from '../interfaces/IEmisor-documentos';

@Injectable({
  providedIn: 'root'
})
export class EmisorDocumentosService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http:HttpClient ) { }

  getTipoDocumentos(): Observable<IEmisorDocumentos[]>{
    
    return this.http.get<IEmisorDocumentos[]>(`${ this.baseUrl }/emisordocumentos`);
  }

  getTipoDocumentosId(id:number):Observable<IEmisorDocumentos>{
    
    return this.http.get<IEmisorDocumentos>(`${ this.baseUrl }/emisordocumentos/${id}`)
  }
}
