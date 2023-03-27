export interface IProgenitor {
    id?: number;
    apellido:string;
    segundo_apellido:string | null;
    nombre:string;
    otros_nombres:string | null;
    type_document_id:number | null;
    numero_de_documento:string;
    tipo_acompaneante?: string;
}
