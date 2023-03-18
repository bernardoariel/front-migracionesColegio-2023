export interface IOrden {
  id?: number;
  notary_id:number | null;
  minor_id:number | null;
  /* aca van otros que no son propios */
  acompaneante1_id?: number | null;
  acompaneante2_id?: number | null;
  progenitores:number[] ,
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
