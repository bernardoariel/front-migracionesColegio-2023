export interface IMenor {
  id?: number;
  apellido:string;
  segundo_apellido?:string | null;
  nombre:string;
  otros_nombres?:string | null;
  nationality_id?:number | null;
  type_document_id?:number | null;
  issuer_document_id?:number | null;
  numero_de_documento?:number | string | null;
  fecha_de_nacimiento?:  string | null ;
  sex_id?: string | number | null;
  domicilio?:string | null;
}

