import { IPersona } from "./IPersona";

export interface IOrden {
  id?: number;
  notary_id:number | null;
  minor_id:number | null;
  /* aca van otros que no son propios */
  autorizante1_id?: number | null;
  autorizante2_id?: number | null;
  acompaneantes?:number[] | IPersona[] ,
  aprobacion?:string | null;
  numero_actuacion_notarial_cert_firma:string;
  cualquier_pais:string;
  serie_foja:string;
  tipo_foja:number | null;
  vigencia_hasta_mayoria_edad:string;
  fecha_vigencia_desde:string;
  fecha_vigencia_hasta:string;
  fecha_del_instrumento:string;
  instrumento:string;
  nro_foja:string;
  paises_desc:string;
}
