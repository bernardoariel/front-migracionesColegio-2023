import { FormControl, Validators } from '@angular/forms';

export const apellidoControl = new FormControl('', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(40),
  Validators.pattern(/^[^0-9]+$/),
]);

export const segundoApellidoControl = new FormControl('', [
  Validators.pattern(/^[^0-9]+$/),
]);

export const nombreControl = new FormControl('', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(40),
  Validators.pattern(/^[^0-9]+$/),
]);

export const otrosNombresControl = new FormControl('', [
  Validators.pattern(/^[^0-9]+$/),
]);

export const nacionalidadControl = new FormControl<number>(11, [Validators.required]);
export const documentosControl = new FormControl<number>(4, [Validators.required]);
export const emisorControl = new FormControl<number>(13, [Validators.required]);

export const numeroDocumentoControl = new FormControl<number | null>(null, [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(40),
]);

export const fechaNacimientoControl = new FormControl('', [Validators.required]);

export const sexoControl = new FormControl<number | null>(null, [Validators.required]);

export const domicilioControl = new FormControl('', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(200),
]);

export const formControls = {
  apellidoControl,
  segundoApellidoControl,
  nombreControl,
  otrosNombresControl,
  nacionalidadControl,
  documentosControl,
  emisorControl,
  numeroDocumentoControl,
  fechaNacimientoControl,
  sexoControl,
  domicilioControl,
};
