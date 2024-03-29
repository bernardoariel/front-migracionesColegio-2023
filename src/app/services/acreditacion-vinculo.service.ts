import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAcreditacionVinculo } from '../interfaces/IAcreditacion-Vinculo';


@Injectable({
  providedIn: 'root'
})
export class AcreditacionVinculoService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http:HttpClient ) { }

  getAcreditarVinculos(): Observable<IAcreditacionVinculo[]>{
    
    return this.http.get<IAcreditacionVinculo[]>(`${ this.baseUrl }/acreditaciones`);
  }

  getAcreditarVinculoId(id:number):Observable<IAcreditacionVinculo>{
    
    return this.http.get<IAcreditacionVinculo>(`${ this.baseUrl }/acreditacion/${id}`)
  }
}
