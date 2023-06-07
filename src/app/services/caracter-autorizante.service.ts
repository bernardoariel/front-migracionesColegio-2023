import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICaracterAutorizante } from '../interfaces/ICaracter-Autorizante';



@Injectable({
  providedIn: 'root'
})
export class CaracterAutorizanteService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http:HttpClient ) { }

  getCaracterAutorizantes(): Observable<ICaracterAutorizante[]>{
    
    return this.http.get<ICaracterAutorizante[]>(`${ this.baseUrl }/autorizaciones`);
  }

  getCaracterAutorizanteId(id:number):Observable<ICaracterAutorizante>{
    
    return this.http.get<ICaracterAutorizante>(`${ this.baseUrl }/autorizacion/${id}`)
  }
}
