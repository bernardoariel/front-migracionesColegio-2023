import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechasiguales'
})
export class FechasigualesPipe implements PipeTransform {

  transform(fechaDesde: Date, fechaHasta: Date): string | null {
    if (fechaDesde && fechaHasta && fechaDesde === fechaHasta) {
      return 'Las fechas no pueden ser iguales';
    }
    return null;
  }

}
