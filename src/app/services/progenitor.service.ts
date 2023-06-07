import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProgenitor } from '../interfaces/iprogenitor';

@Injectable({
  providedIn: 'root'
})
export class ProgenitorService {

  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }

  getProgenitores(): Observable<IProgenitor[]>{
    
    return this.http.get<IProgenitor[]>(`${ this.baseUrl }/otrosprogenitores`);
  }

  getProgenitorId(id:number):Observable<IProgenitor>{
    
    return this.http.get<IProgenitor>(`${ this.baseUrl }/otroprogenitor/${id}`)
  }
  actualizarProgenitor(progenitor:IProgenitor):Observable<IProgenitor>{
    return this.http.put<IProgenitor>(`${ this.baseUrl }/actualizarprogenitor/${progenitor.id}`,progenitor,{headers: this.httpHeaders})
  }

  agregarProgenitor( progenitor: IProgenitor ): Observable<IProgenitor>{
    return this.http.post<IProgenitor>(`${this.baseUrl}/agregarprogenitor`,progenitor);
  }

  eliminarProgenitor( id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/eliminarprogenitor/${id}`)
  }
}
