import { IOrdenDatos } from './../interfaces/IOrden-datos';
import { Injectable } from '@angular/core';
import { IPersona } from '../interfaces/IPersona';
import { Escribano } from '../interfaces/escribano';
import { BehaviorSubject, Observable, catchError, of, switchMap, take, tap } from 'rxjs';
import { EscribanosService } from './escribanos.service';

// crear interface para la solicitud
export interface ISolicitud {
  escribano: Escribano;
  menores: IPersona[];
  autorizante1: IPersona;
  autorizante2: IPersona;
  acompaneantes: IPersona[];
  solicitud: IOrdenDatos;
}
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private solicitud$ = new BehaviorSubject<ISolicitud>({
    escribano: {} as Escribano,
    menores: [],
    autorizante1: {} as IPersona,
    autorizante2: {} as IPersona,
    acompaneantes: [],
    solicitud: {} as IOrdenDatos,
  });

  constructor(private escribanosService: EscribanosService) {}

  private getEscribanoIdFromLocalStorage(): number {
    if (localStorage.getItem('token') && localStorage.getItem('userId')) {
      return Number(localStorage.getItem('userId')) ?? 0;
    }
    return 0;
  }

  agregarSolicitud(solicitud: IOrdenDatos): Observable<ISolicitud> {
    const solicitudActual = this.solicitud$.value;
    solicitudActual.solicitud = solicitud;
    this.solicitud$.next(solicitudActual);
    return this.solicitud$.asObservable();
  }
  agregarEscribano(escribano: Escribano): Observable<ISolicitud> {
    const solicitud = this.solicitud$.value;
    solicitud.escribano = escribano;
    console.log('agregarEscribano::: ', solicitud);
    this.solicitud$.next(solicitud);
    return this.solicitud$.asObservable();
  }

  agregarMenor(menor: IPersona): Observable<ISolicitud> {
    const solicitud = this.solicitud$.value;
    solicitud.menores.push(menor);
    console.log('agregarMenor::: ', solicitud);
    this.solicitud$.next(solicitud);
    return this.solicitud$.asObservable();
  }

  agregarAutorizante1(autorizante1: IPersona): Observable<ISolicitud> {
    const solicitud = this.solicitud$.value;
    solicitud.autorizante1 = autorizante1;
    console.log('agregarAutorizante1::: ', solicitud);
    this.solicitud$.next(solicitud);
    return this.solicitud$.asObservable();
  }

  agregarAutorizante2(autorizante2: IPersona): Observable<ISolicitud> {
    const solicitud = this.solicitud$.value;
    solicitud.autorizante2 = autorizante2;
    console.log('agregarAutorizante2::: ', solicitud);
    this.solicitud$.next(solicitud);
    return this.solicitud$.asObservable();
  }

  agregarAcompaneante(acompaneante: IPersona): Observable<ISolicitud> {
    const solicitud = this.solicitud$.value;
    solicitud.acompaneantes.push(acompaneante);
    console.log('agregarAcompaneante::: ', solicitud);
    this.solicitud$.next(solicitud);
    return this.solicitud$.asObservable();
  }

  obtenerSolicitud(): Observable<ISolicitud> {
    const escribanoId = this.getEscribanoIdFromLocalStorage();
    this.escribanosService
      .getEscribanoId(escribanoId)
      .pipe(
        tap((escribano) => {
          this.agregarEscribano(escribano).subscribe();
        }),
        catchError((err) => {
          // Handle the error here.
          // For now, we'll just return an empty observable.
          return of();
        })
      )
      .subscribe();
    return this.solicitud$.asObservable();
  }
  eliminarCampo( solicitud: ISolicitud,campoAEliminar: keyof ISolicitud,indiceAEliminar?: number): void {
      console.log('campoAEliminar::: ', campoAEliminar);
    if (campoAEliminar !== 'menores' && campoAEliminar !== 'acompaneantes') solicitud[campoAEliminar] = {} as any;
    
    if (campoAEliminar === 'acompaneantes')  solicitud.acompaneantes.splice(indiceAEliminar!, 1);
   
    if (campoAEliminar === 'menores') solicitud.menores.splice(indiceAEliminar!, 1);
   
  }
}
