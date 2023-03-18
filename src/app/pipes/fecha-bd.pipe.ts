import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaBD'
})
export class FechaBDPipe implements PipeTransform {

  transform(value: string): unknown {
    return null;
  }

}
