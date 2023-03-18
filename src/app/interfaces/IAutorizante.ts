export interface IAutorizante {
  id?: number;
  apellido:string;
  segundo_apellido:string | null;
  nombre:string;
  otros_nombres:string | null;
  nationality_id:number | null;
  type_document_id:number | null;
  issuer_document_id:number | null;
  numero_de_documento:string;
  fecha_de_nacimiento:string;
  sex_id:number | null;
  domicilio:string;
  authorizing_relatives_id:number | null;
  accreditation_links_id:number | null;
  telefono:null | string;
  requiere_aut_adicional_de:null | string;
}

