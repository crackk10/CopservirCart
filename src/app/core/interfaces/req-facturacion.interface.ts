import { DetalleFactura } from "./req-detalleFactura.interface";
import { FacturaSinId } from "./req-facturaSinId.interface";

export interface Facturacion {
  factura: FacturaSinId;
  detalleFactura: DetalleFactura[];
}