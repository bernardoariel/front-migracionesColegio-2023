import { Injectable } from '@angular/core';
import { IPersona } from '../interfaces/IPersona';
import { Escribano } from '../interfaces/escribano';
import { BehaviorSubject, Observable, take } from 'rxjs';

// crear interface para la solicitud
export interface ISolicitud {
  // escribano: Escribano
  menor: IPersona
  autorizante1: IPersona,
  autorizante2: IPersona,
  // acompaneante: IPersona
  acompaneantes: IPersona[]
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
  agregarAutorizante1(autorizante1: IPersona): Observable<ISolicitud | null>{
    console.log('autorizante1::: ', autorizante1);
   this.solicitud$
   .pipe(
    take(1)
   ).subscribe({
      next: (solicitud)=>{
        console.log('solicitud::: ', solicitud);
        if (solicitud !== null) {
          solicitud.autorizante1 = autorizante1;
          console.log('solicitud::: ', solicitud);
          this.solicitud$.next(solicitud);
        }
      }
   })
   return this.solicitud$.asObservable();
  }

  agregarAutorizante2(autorizante2: IPersona): Observable<ISolicitud | null>{
   this.solicitud$
   .pipe(
    take(1)
   ).subscribe({
      next: (solicitud)=>{
        if (solicitud !== null) {
          solicitud.autorizante2 = autorizante2;
          console.log('solicitud::: ', solicitud);
          this.solicitud$.next(solicitud);
        }
      }
   })

   return this.solicitud$.asObservable();
  }

  agregarAcompaneante(acompaneante: IPersona): Observable<ISolicitud | null>{

    this.solicitud$
    .pipe(
     take(1)
    ).subscribe({
       next: (solicitud)=>{
         if (solicitud !== null) {
          solicitud.acompaneantes.push(acompaneante);
          console.log('solicitud::: ', solicitud);
           this.solicitud$.next(solicitud);
         }
       }
    })

    return this.solicitud$.asObservable();
  }

  //get para obtener la solicitud
  obtenerSolicitud():Observable<ISolicitud | null>{
    this.solicitud$.next({
      // escribano: {} as Escribano,
      menor: {} as IPersona,
      autorizante1: {} as IPersona,
      autorizante2: {} as IPersona,
      // acompaneante: {} as IPersona,
      acompaneantes: [] as IPersona[],

    })
    return this.solicitud$.asObservable();
  }

  eliminarCampo(solicitud: ISolicitud, campoAEliminar: keyof ISolicitud,indiceAEliminar?: number): void {
    if (campoAEliminar === 'acompaneantes') {
      solicitud.acompaneantes.splice(indiceAEliminar!, 1);
    } else {
      solicitud[campoAEliminar] = {} as any; // o null, dependiendo del tipo del campo
    }
  }
}
