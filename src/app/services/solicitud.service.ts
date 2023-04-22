import { Injectable } from '@angular/core';
import { IPersona } from '../interfaces/IPersona';
import { Escribano } from '../interfaces/escribano';
import { BehaviorSubject, Observable, take } from 'rxjs';

// crear interface para la solicitud
export interface ISolicitud {
  // escribano: Escribano
  menor: IPersona
  /* autorizante1: IPersona,
  autorizante2: IPersona,
  acompaneante: IPersona[] */
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private solicitud$ = new BehaviorSubject<ISolicitud | null>(
    null
  );


  // crear un metodo para agregar un menor a la solicitud
  agregarMenor(menor: IPersona): Observable<ISolicitud | null>{
   this.solicitud$
   .pipe(
    take(1)
   ).subscribe({
      next: (solicitud)=>{
        if (solicitud !== null) {
          solicitud.menor = menor;
          this.solicitud$.next(solicitud);
        }
      }
   })
   return this.solicitud$.asObservable();
  }

  // crear un metodo para remover un menor de la solicitud
  removerMenor(){
    // this.solicitud.menor = {} as IPersona;
  }
  // get para obtener lo que hay cargado en la solicitud
 /*  get getMenor(){
    return this.solicitud.menor;
  } */
  //get para obtener la solicitud
  obtenerSolicitud():Observable<ISolicitud | null>{
    this.solicitud$.next({
      // escribano: {} as Escribano,
      menor: {} as IPersona
      /* autorizante1: {} as IPersona,
      autorizante2: {} as IPersona,
      acompaneante: [] */
    })
    return this.solicitud$.asObservable();
  }

}
