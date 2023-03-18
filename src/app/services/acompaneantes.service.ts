import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IProgenitor } from '../interfaces/iprogenitor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcompaneantesService {
  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }

  getProgenitores(): Observable<IProgenitor[]>{
    console.log(`${ this.baseUrl }/personas`)
    return this.http.get<IProgenitor[]>(`${ this.baseUrl }/personas`);
  }

  getProgenitorId(id:number):Observable<IProgenitor>{
    console.log(`${ this.baseUrl }/persona/${id}`)
    return this.http.get<IProgenitor>(`${ this.baseUrl }/persona/${id}`)
  }
  actualizarProgenitor(progenitor:IProgenitor):Observable<IProgenitor>{
    return this.http.put<IProgenitor>(`${ this.baseUrl }/actualizarPersona/${progenitor.id}`,progenitor,{headers: this.httpHeaders})
  }

  agregarProgenitor( progenitor: IProgenitor ): Observable<IProgenitor>{
    return this.http.post<IProgenitor>(`${this.baseUrl}/agregarPersona`,progenitor);
  }

  eliminarProgenitor( id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/eliminarPersona/${id}`)
  }
}
