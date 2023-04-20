import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMenor } from '../interfaces/IMenor';
import { Observable } from 'rxjs';
import { IPersona } from '../interfaces/IPersona';



@Injectable({
  providedIn: 'root'
})

export class PersonasService {
  private baseUrl: string = environment.baseUrl + '/v2';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }


  agregarPersona( persona: IPersona ): Observable<IPersona>{
    return this.http.post<IPersona>(`${this.baseUrl}/persona/new`,persona);
  }

  updatePersona(persona:IPersona):Observable<IMenor>{
    return this.http.put<IPersona>(`${ this.baseUrl }/persona/update/${persona.id}`,persona,{headers: this.httpHeaders})
  }

  getPersonaByDocumento(dni:number):Observable<any>{

    return this.http.get<number>(`${this.baseUrl}/getPersonaByDocumento/${dni}`);

  }

  getPersonaById(id:number):Observable<IMenor>{
    console.log(`${ this.baseUrl }/persona/${id}`)
    return this.http.get<IMenor>(`${ this.baseUrl }/personaById/${id}`)
  }

 /*  getMenorPersonasByNumeroDocumento(dni:number):Observable<any>{

    return this.http.get<number>(`${this.baseUrl}/buscarMenorPorDocumento/${dni}`);

  } */

  /* tendria que ir en menores */
  getMenores(): Observable<IMenor[]>{
    // console.log(`${ this.baseUrl }/personas/menores`)
    return this.http.get<IMenor[]>(`${ this.baseUrl }/menores`);
  }
  getMenoresJoinPersonas(): Observable<IMenor[]>{

    return this.http.get<IMenor[]>(`${ this.baseUrl }/menoresJoinPersonas`);
  }









  /* para compatibilidad */
  agregarPersonaMenor( persona: IPersona ): Observable<IPersona>{
    // crear un observable con el operador of
    return this.http.post<IPersona>(`${this.baseUrl}/persona/new`,persona);
  }
}
