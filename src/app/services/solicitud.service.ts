import { IOrdenDatos } from './../interfaces/IOrden-datos';
import { Injectable } from '@angular/core';
import { IPersona } from '../interfaces/IPersona';
import { Escribano } from '../interfaces/escribano';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { EscribanosService } from './escribanos.service';

// crear interface para la solicitud
export interface ISolicitud {
  escribano: Escribano
  menor: IPersona
  autorizante1: IPersona,
  autorizante2: IPersona,
  acompaneantes: IPersona[]
  solicitud: IOrdenDatos
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  escribanoLogueado!: Escribano  ;
  constructor(private escribanosService: EscribanosService){

  }
  private solicitud$ = new BehaviorSubject<ISolicitud | null>(
    null
  );

  agregarSolicitud(solicitud: IOrdenDatos): Observable<ISolicitud | null> {
    this.solicitud$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (solicitudActual) => {
          if (solicitudActual !== null) {
            solicitudActual.solicitud = solicitud;
            this.solicitud$.next(solicitudActual);
          }
        }
      });
    return this.solicitud$.asObservable();
  }

  // crear un metodo para agregar un menor a la solicitud
  agregarEscribano(escribano: Escribano): Observable<ISolicitud | null>{
    
   this.solicitud$
   .pipe(
    take(1)
   ).subscribe({
      next: (solicitud)=>{
        if (solicitud !== null) {
          solicitud.escribano = escribano;
          this.solicitud$.next(solicitud);
        }
      }
   })
   return this.solicitud$.asObservable();
  }
  // crear un metodo para agregar un menor a la solicitud
  agregarMenor(menor: IPersona): Observable<ISolicitud | null>{
    // obtene el userID del escribano logueado localstorage
    let escriLocalStorage: number = Number(localStorage.getItem('userId'))?? '0';
    if(localStorage.getItem('token')){

      if(localStorage.getItem('userId')){
        escriLocalStorage =  Number(localStorage.getItem('userId')) ?? '0';

      }
    }
    this.escribanosService.getEscribanoId(escriLocalStorage).subscribe(
      (escribano)=>{

      this.escribanoLogueado = escribano;

      this.agregarEscribano(this.escribanoLogueado).subscribe();
      }
    )

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
    
   this.solicitud$
   .pipe(
    take(1)
   ).subscribe({
      next: (solicitud)=>{
        
        if (solicitud !== null) {
          solicitud.autorizante1 = autorizante1;
          
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
          
           this.solicitud$.next(solicitud);
         }
       }
    })

    return this.solicitud$.asObservable();
  }

  //get para obtener la solicitud
  obtenerSolicitud():Observable<ISolicitud | null>{
    this.solicitud$.next({
      escribano: {} as Escribano,
      menor: {} as IPersona,
      autorizante1: {} as IPersona,
      autorizante2: {} as IPersona,
      acompaneantes: [] as IPersona[],
      solicitud: {} as IOrdenDatos
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
