import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMenor } from '../interfaces/IMenor';

@Injectable({
  providedIn: 'root'
})
export class MenoresService {
  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }

  getMenores(): Observable<IMenor[]>{
    console.log(`${ this.baseUrl }/menores`)
    return this.http.get<IMenor[]>(`${ this.baseUrl }/menores`);
  }
  getMenoresFormateado(): Observable<IMenor[]>{
    console.log(`${ this.baseUrl }/menorestodos`)
    return this.http.get<IMenor[]>(`${ this.baseUrl }/menorestodos`);
  }

  getMenorId(id:number):Observable<IMenor>{
    console.log(`${ this.baseUrl }/menor/${id}`)
    return this.http.get<IMenor>(`${ this.baseUrl }/menor/${id}`)
  }

  actualizarMenor(menor:IMenor):Observable<IMenor>{
    return this.http.put<IMenor>(`${ this.baseUrl }/actualizarmenor/${menor.id}`,menor,{headers: this.httpHeaders})
  }

  agregarMenor( menor: IMenor ): Observable<IMenor>{
    return this.http.post<IMenor>(`${this.baseUrl}/agregarmenor`,menor);
  }

  eliminarMenor( id:number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/eliminarmenor/${id}`)
  }
}
