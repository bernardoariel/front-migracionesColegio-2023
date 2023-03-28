import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeConfirmacionServiceService {

  private clearInputsSource = new Subject<void>();
  clearInputs$ = this.clearInputsSource.asObservable();
  constructor() { }
  confirmClearInputs(): void {
    this.clearInputsSource.next();
  }
}
