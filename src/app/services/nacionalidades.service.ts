import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INacionalidad } from '../interfaces/INacionalidad';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http:HttpClient ) { }

  getNacionalidades(): Observable<INacionalidad[]>{
    
    return this.http.get<INacionalidad[]>(`${ this.baseUrl }/nacionalidades`);
  }

  getNacionalidadId(id:number):Observable<INacionalidad>{
   
    return this.http.get<INacionalidad>(`${ this.baseUrl }/nacionalidad/${id}`)
  }
}
