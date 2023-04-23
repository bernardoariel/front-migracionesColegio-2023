import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMenor } from '../interfaces/IMenor';
import { Observable, Subject } from 'rxjs';
import { IPersona } from '../interfaces/IPersona';



@Injectable({
  providedIn: 'root'
})

export class PersonasService {
  private menores$ = new Subject<IPersona[]>();
  private baseUrl: string = environment.baseUrl + '/v2';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient) { }


  agregarPersona( persona: IPersona ): Observable<IPersona>{
    return this.http.post<IPersona>(`${this.baseUrl}/persona/new`,persona);
  }

  updatePersona(persona:IPersona):Observable<IPersona>{
    return this.http.put<IPersona>(`${ this.baseUrl }/persona/update/${persona.id}`,persona,{headers: this.httpHeaders})
  }

  getPersonaByDocumento(dni:number):Observable<any>{

    return this.http.get<number>(`${this.baseUrl}/getPersonaByDocumento/${dni}`);

  }

  getPersonaById(id:number):Observable<IPersona>{

    return this.http.get<IPersona>(`${ this.baseUrl }/personaById/${id}`)
  }

  getPersonasJoin(): Observable<IPersona[]>{

    return this.http.get<IPersona[]>(`${ this.baseUrl }/personasJoin`);
  }

  getPersonasAcompaneantesJoin(): Observable<IPersona[]>{

   /*  this.menores$ = this.http.get<IPersona[]>(`${ this.baseUrl }/personasAcompaneantesJoin`) as Subject<IPersona[]>;
    return this.menores$.asObservable(); */
    return this.http.get<IPersona[]>(`${ this.baseUrl }/personasAcompaneantesJoin`)
  }

 /*  getMenorPersonasByNumeroDocumento(dni:number):Observable<any>{

    return this.http.get<number>(`${this.baseUrl}/buscarMenorPorDocumento/${dni}`);

  } */

  /* tendria que ir en menores */
  getMenores(): Observable<IMenor[]>{
    // console.log(`${ this.baseUrl }/personas/menores`)
    return this.http.get<IMenor[]>(`${ this.baseUrl }/menores`);
  }
  getMenoresJoin(): Observable<IMenor[]>{

    return this.http.get<IMenor[]>(`${ this.baseUrl }/menoresJoin`);
  }









  /* para compatibilidad */
  agregarPersonaMenor( persona: IPersona ): Observable<IPersona>{
    // crear un observable con el operador of
    return this.http.post<IPersona>(`${this.baseUrl}/persona/new`,persona);
  }
}
