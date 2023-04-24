import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrden } from '../interfaces/IOrden';
import { OrdenFormateada } from '../interfaces/orden-formateada';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private baseUrl: string = environment.baseUrl + '/v2';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  private token: null | string = null;
  constructor( private http:HttpClient) {
    this.token = localStorage.getItem('token');
  }

  getOrdenes(): Observable<IOrden[]>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    return this.http.get<IOrden[]>(`${this.baseUrl}/ordenes`, { headers: httpHeaders });
  }

  getOrdenId(id:number):Observable<IOrden>{
    console.log(`${ this.baseUrl }/orden/${id}`)
    return this.http.get<IOrden>(`${ this.baseUrl }/orden/${id}`)
  }

  actualizarOrden(orden:IOrden):Observable<IOrden>{

    return this.http.put<IOrden>(`${ this.baseUrl }actualizarorden/${orden.id}`,orden,{headers: this.httpHeaders})
  }

  agregarOrden( orden: IOrden ): Observable<IOrden>{

    return this.http.post<IOrden>(`${this.baseUrl}/agregarorden`,orden);
  }

  eliminarOrden( id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/eliminarorden/${id}`)
  }

  getOrdenesFormateado(): Observable<OrdenFormateada[]>{

    console.log(`${ this.baseUrl }/ordenestodos`)
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    });
    return this.http.get<OrdenFormateada[]>(`${ this.baseUrl }/ordenestodos`,{ headers: httpHeaders });
  }

  duplicateOrdenId(id:number):Observable<IOrden>{
    console.log(`${ this.baseUrl }/duplicate/${id}`)
    return this.http.get<IOrden>(`${ this.baseUrl }/duplicate/${id}`)
  }
}
