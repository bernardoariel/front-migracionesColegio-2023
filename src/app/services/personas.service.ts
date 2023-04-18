import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMenor } from '../interfaces/IMenor';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class PersonasService {
  private baseUrl: string = environment.baseUrl + '/v2';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }

  getMenores(): Observable<IMenor[]>{
    // console.log(`${ this.baseUrl }/personas/menores`)
    return this.http.get<IMenor[]>(`${ this.baseUrl }/menores`);
  }
  getMenoresJoin(): Observable<IMenor[]>{
    // console.log(`${ this.baseUrl }/personas/menores`)
    return this.http.get<IMenor[]>(`${ this.baseUrl }/menoresjoin`);
  }

  getMenorPersonasByNumeroDocumento(dni:number):Observable<any>{

    return this.http.get<number>(`${this.baseUrl}/buscarMenorPorDocumento/${dni}`);

  }

  agregarPersonaMenor( menor: IMenor ): Observable<IMenor>{
    return this.http.post<IMenor>(`${this.baseUrl}/menores/agregarmenor`,menor);
  }

}
