import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenesItemsService {
  private baseUrl: string = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor( private http:HttpClient ) { }

  getOrdenId(id:number):Observable<any>{
    console.log(`${ this.baseUrl }/ordenesitems/${id}`)
    return this.http.get<any>(`${ this.baseUrl }/ordenesitems/${id}`)
  }

}
