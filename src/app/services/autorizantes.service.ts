import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAutorizante } from '../interfaces/IAutorizante';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorizantesService {
  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }

  getAutorizantes(): Observable<IAutorizante[]>{
    return this.http.get<IAutorizante[]>(`${ this.baseUrl }/autorizantes`)
  }

  getAutorizantesFormateado(): Observable<IAutorizante[]>{
    console.log(`${ this.baseUrl }/autorizantestodos`)
    return this.http.get<IAutorizante[]>(`${ this.baseUrl }/autorizantestodos`);
  }
  getAutorizanteId(id:number):Observable<IAutorizante>{
    return this.http.get<IAutorizante>(`${this.baseUrl}/autorizante/${id}`)
  }

  actualizarAutorizado(autorizante:IAutorizante):Observable<IAutorizante>{
    return this.http.put<IAutorizante>(`${ this.baseUrl }/actualizarautorizante/${autorizante.id}`,autorizante,{headers: this.httpHeaders})
  }

  agregarAutorizante( autorizante: IAutorizante ): Observable<IAutorizante>{
    return this.http.post<IAutorizante>(`${this.baseUrl}/agregarautorizante`,autorizante);
  }

  eliminarAutorizante( id:number ):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/deleteAutorizante/${id}`)
  }

}
