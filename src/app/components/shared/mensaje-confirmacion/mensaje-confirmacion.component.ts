import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MensajeConfirmacionServiceService } from 'src/app/services/mensaje-confirmacion-service.service';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.scss']
})
export class MensajeConfirmacionComponent{
  clearInputs$: any;


  constructor(public dialogRef: MatDialogRef<MensajeConfirmacionComponent>,
    private mensajeConfirmacionService: MensajeConfirmacionServiceService) {}


  close(): void {
    this.dialogRef.close();
  }

  clearInputs() {
    // aquí limpias los valores de los inputs
    console.log('limpiarimputs');
    this.mensajeConfirmacionService.confirmClearInputs();
    this.dialogRef.close();
  }
}
