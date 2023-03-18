import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Escribano } from '../interfaces/escribano';



@Injectable({
  providedIn: 'root'
})
export class EscribanosService {

  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor( private http: HttpClient ) { }

  getEscribanos(): Observable<Escribano[]>{
    console.log(`${ this.baseUrl }/escribanos`)
    return this.http.get<Escribano[]>(`${ this.baseUrl }/escribanos`);
  }

  getEscribanoId(id:number):Observable<Escribano>{
    console.log(`${ this.baseUrl }/escribano/${id}`)
    return this.http.get<Escribano>(`${ this.baseUrl }/escribano/${id}`)
  }

  actualizarEscribano(escribano:Escribano):Observable<Escribano>{
    return this.http.put<Escribano>(`${ this.baseUrl }/actualizarEscribano/${escribano.id}`,escribano,{headers: this.httpHeaders})
  }

  agregarEscribano( escribano: Escribano ): Observable<Escribano>{
    return this.http.post<Escribano>(`${this.baseUrl}/agregarEscribano`,escribano);
  }

  eliminarEscribano( id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/deleteEscribano/${id}`)
  }

}
