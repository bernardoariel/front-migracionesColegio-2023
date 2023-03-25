import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcompanianteTipoService {

  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }

  getTipoCompania(): Observable<any[]>{
    console.log(`${ this.baseUrl }/tipocompania`)
    return this.http.get<any[]>(`${ this.baseUrl }/tipocompania`);
  }
}
