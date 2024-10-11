import { Factura } from "./req-factura.interface";

export interface Contabilidad{
  id: number;
  fecha:  Date
  facturas: Factura[]  | null
  total:number | null
  total_descuento:number | null
  total_iva:number | null
  total_neto:number | null
}