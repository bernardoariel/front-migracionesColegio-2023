/* export interface OrdenFormateada {
    notary_id: number
    apellido:string | null
    segundo_apellido:string | null
    nombre:string | null
    otros_nombres:string | null
    fecha_del_instrumento:string
    numero_actuacion_notarial_cert_firma:string
    serie_foja:string;
    tipo_foja:number | null;
    aprobacion?:string | null;

}
 */
export interface OrdenFormateada {
  id: number;
  nombre: string;
  apellido: string;
  segundo_apellido: string;
  otros_nombres: string;
  documento: string;
  tipo_foja: string;
  serie_foja: string;
  nro_foja: string;
  numero_actuacion_notarial_cert_firma: string;
  fecha_del_instrumento: string;
  fecha_vigencia_desde: string;
  fecha_vigencia_hasta: string;
  cualquier_pais: string;
  paises_desc: string;
  instrumento: string;
  aprobacion: string;
  created_at: string;
  updated_at: string;
  minor_id: number;
  notary_id: number;
  nombreCompletoEscribano?: string;
  nombreescribano?:string;
  apellidoescribano?:string;
}
