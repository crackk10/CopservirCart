import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Factura} from "../interfaces/req-factura.interface";
import { FacturaSinId } from "../interfaces/req-facturaSinId.interface";
import { Facturacion } from "../interfaces/req-facturacion.interface";
import { Producto } from "../interfaces/req-producto.interface";
import { DetalleFactura } from "../interfaces/req-detalleFactura.interface";

@Injectable({
  providedIn: "root",
})
export class FacturacionService {

  private apiUrl = "http://localhost:3000/copservir";
  constructor(private http: HttpClient) {}

  facturar(factura: FacturaSinId, productos : Producto[] ):Observable<Factura> {
    const detalleFactura : DetalleFactura[] = this.convertirProductosADetalleFactura(productos)
    const params : Facturacion = { factura, detalleFactura}   
    return this.http.post<Factura>(`${this.apiUrl}/factura`, params);
  }

  convertirProductosADetalleFactura(params:Producto[]){
    return params.map((values)=>{
      const detalleFactura : DetalleFactura = {
        productoId: values.id,
        cantidad:values.cantidad!,
        iva_facturado:values.iva,
        descuento_facturado:values.descuento,
      }
      return detalleFactura
    })
  }
}
