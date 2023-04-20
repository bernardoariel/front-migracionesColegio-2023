import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';



@NgModule({
  declarations: [
    ControlErrorMessagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ControlErrorMessagesPipe
  ]
})
export class PipesModule { }
