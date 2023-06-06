import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMenor } from '../interfaces/IMenor';
import { Observable, Subject, catchError, tap } from 'rxjs';
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
    
    
    return this.http.put<IPersona>(`${this.baseUrl}/persona/update/${persona.id}`, persona, { headers: this.httpHeaders })
    .pipe(
      tap(res => {
        // Manejar la respuesta exitosa aquí
        console.log('Enviado de datos: ',persona)
        console.log('Respuesta exitosa:', res);
      }),
      catchError(error => {
        // Manejar el error aquí
        console.error('Error:', error);
        // Puedes lanzar un error personalizado si lo deseas
        throw new Error('Hubo un error al actualizar la persona');
      })
    );
  }

  getPersonaByDocumento(dni:number):Observable<any>{

    return this.http.get<number>(`${this.baseUrl}/getPersonaByDocumento/${dni}`);

  }

  getPersonaById(id:number):Observable<IPersona>{
    console.log('aaaa',`${ this.baseUrl }/personaById/${id}`)
    return this.http.get<IPersona>(`${ this.baseUrl }/personaById/${id}`)
  }

  getPersonasJoin(): Observable<IPersona[]>{

    return this.http.get<IPersona[]>(`${ this.baseUrl }/personasJoin`);
  }

  getPersonasAcompaneantesJoin(): Observable<IPersona[]>{

    return this.http.get<IPersona[]>(`${ this.baseUrl }/personasAcompaneantesJoin`)
  }

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