import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.scss']
})
export class MensajeConfirmacionComponent{

  constructor(public dialogRef: MatDialogRef<MensajeConfirmacionComponent>) {}


  close(): void {
    this.dialogRef.close();
  }

  clearInputs() {
    // aquí limpias los valores de los inputs
    console.log('limpiarimputs')
  }
}
