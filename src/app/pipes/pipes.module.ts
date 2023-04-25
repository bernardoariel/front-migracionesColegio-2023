import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';
import { FechasigualesPipe } from './fechasiguales.pipe';




@NgModule({
  declarations: [
    ControlErrorMessagesPipe,
    FechasigualesPipe,

  ],
  imports: [
    CommonModule
  ],
  exports:[
    ControlErrorMessagesPipe
  ]
})
export class PipesModule { }
