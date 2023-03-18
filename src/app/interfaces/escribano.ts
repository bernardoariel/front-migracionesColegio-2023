export interface Escribano {
  id?: number;
  nombre: string;
  apellido: string;
  matricula: string;
  email: string;
  habilitado: Estado;
  password?:string;
  tipo?:string;
}

export enum Estado{
  Habilitado,
  Inhabilitado
}
