export interface IOrdenPersonas {
  [key: string]: any;
  id?: number;
  notary_id:number | null;
  minor_id:number | null;
  /* aca van otros que no son propios */
  acompaneante1_id?: number | null;
  acompaneante2_id?: number | null;
  progenitores: number[];
  acompaneantes: number[];
}
