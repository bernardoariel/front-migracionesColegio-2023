import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  bsqMenorEdad:number = 0
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef:MatDialogRef<any>) {
    this.bsqMenorEdad = this.data.bsqMenorEdad

  }

  guardar(){

   this.dialogRef.close(true)

  }

}
