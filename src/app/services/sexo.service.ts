import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISexo } from '../interfaces/isexo';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http:HttpClient ) { }

  getSexo(): Observable<ISexo[]>{
   
    return this.http.get<ISexo[]>(`${ this.baseUrl }/sexos`);
  }

  getSexoId(id:number):Observable<ISexo>{
  
    return this.http.get<ISexo>(`${ this.baseUrl }/sexos/${id}`)
  }
}
