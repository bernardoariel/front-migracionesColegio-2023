import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrden } from '../interfaces/IOrden';

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  private baseUrl: string = environment.baseUrl + '/v2';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }



  aprobarSoap(valor:number):Observable<any>{
    return this.http.post<IOrden>(`${this.baseUrl}/soap/${valor}`,valor);
  }

}
