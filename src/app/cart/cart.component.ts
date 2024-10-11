import {Component, inject, Signal, signal} from "@angular/core";
import {CartService} from "../core/services/cart.service";
import {CommonModule} from "@angular/common";
import {ContenidoCartComponent} from "./contenido-cart/contenido-cart.component";
import {FormularioCartComponent} from "./formulario-cart/formulario-cart.component";
import {Producto} from "../core/interfaces/req-producto.interface";
import {FacturacionService} from "../core/services/facturacion.service";
import {TipoPago} from "../core/enums/tipoPago.enum";
import {TipoEntrega} from "../core/enums/tipoEntrega.enum";
import { HttpClientJsonpModule } from "@angular/common/http";
import { FacturaSinId } from "../core/interfaces/req-facturaSinId.interface";
import { ArqueoComponent } from "../arqueo/arqueo.component";
import { ProductoService } from "../core/services/producto.service";
import { CalculadoraDePreciosService } from "../core/services/calculadora-de-precios.service";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, ContenidoCartComponent, FormularioCartComponent, HttpClientJsonpModule, ArqueoComponent],
  templateUrl: "./cart.component.html",
  styles: `.card-text {
    margin-bottom: 5px; /* Reduce el margen inferior de los párrafos */
  }`,
})
export class CartComponent {
  fecha = new Date()
  productosEnCarrito!: Producto[]; 
  totalVentaSinDescuento = signal<number>(0)
  totalDescuentoVenta = signal<number>(0);
  totalIvaVenta = signal<number>(0)
  totalVenta = signal<number>(0);
  datosFactura = signal<FacturaSinId>({
    fecha: String(`${this.fecha.getFullYear()}-${this.fecha.getMonth()+1}-${this.fecha.getDay()}`),
    cliente: "Gustavo Góme",
    total: 0,
    total_descuento: 0,
    total_iva:0,
    total_neto:0,
    tipo_pago: TipoPago.EFECTIVO,
    tipo_entrega: TipoEntrega.PRESENCIAL,
  });

  constructor(
    private readonly calculadoraDePrecios : CalculadoraDePreciosService,
    private readonly facturacionService : FacturacionService,
    private readonly cartService : CartService,
    private readonly productoService : ProductoService
  ){
    this.cartService.productos$.subscribe({//cada vez que se agrega un producto al carrito
      next: (value) => {
        this.actualizarSignals(value)
        this.productosEnCarrito = value;//agrego los productos al array
        this.actualizarFactura()
      },
    });
  }
  productos$ = this.productoService.getProductos()
  facturar() {
    this.facturacionService.facturar(this.datosFactura(), this.productosEnCarrito).subscribe({
      next: (factura) => {
        this.cartService.vaciarCarrito()
        this.productos$ = this.productoService.getProductos()
      },
      error: (error) => {
        console.error(error);
      }
    });
    
  }
  actualizarSignals(value : Producto[]){
    this.totalVentaSinDescuento.set(Math.trunc(this.calculadoraDePrecios.totalSinDescuento(value)));
    this.totalIvaVenta.set(Math.trunc(this.calculadoraDePrecios.totalIva(value)));
    this.totalDescuentoVenta.set(Math.trunc(this.calculadoraDePrecios.totalDescuentos(value))); 
    this.totalVenta.set(Math.trunc(this.calculadoraDePrecios.totalVenta(value))); 
  }
  actualizarFactura(){//actualizo los datos de la factura con los signal
    this.datosFactura.update((df) => ({
      ...df,
      total: this.totalVentaSinDescuento(),
      total_descuento: this.totalDescuentoVenta(),
      total_iva: this.totalIvaVenta(),
      total_neto: this.totalVenta(),
    }));
  }
}
