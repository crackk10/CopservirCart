import { TipoEntrega } from "../enums/tipoEntrega.enum";
import { TipoPago } from "../enums/tipoPago.enum";

export interface Factura{
  id:number|null
  fecha: string;
  cliente: string;
  total: number;
  total_descuento:number
  total_iva:number
  total_neto:number
  tipo_pago : TipoPago
  tipo_entrega :  TipoEntrega
}