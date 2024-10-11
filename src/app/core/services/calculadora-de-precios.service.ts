import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/req-producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraDePreciosService {
  // valor base del producto teniendo  x cantidad
  private totalPorProductoSinIva(producto: Producto): number {
    return producto.precio_base * producto.cantidad!;
  }

  // total de descuento aplicable a un producto
  private totalDescuento(producto: Producto): number {
    return this.totalPorProductoSinIva(producto) * (producto.descuento / 100);
  }

  // descuento aplicable a un producto
  private totalPorProductoConDescuento(producto: Producto): number {
    if (producto.descuento > 0) {
      return (
        this.totalPorProductoSinIva(producto) - this.totalDescuento(producto)
      );
    }
    return this.totalPorProductoSinIva(producto);
  }
  // valor de iva aplicable por producto
  private valorIva(producto: Producto): number {
    return this.totalPorProductoConDescuento(producto) * (producto.iva / 100);
  }
  // luego de aplicar descuento, aplico el iva
  private totalPorProductoConDescuentoIva(producto: Producto): number {
    return (
      this.totalPorProductoConDescuento(producto) + this.valorIva(producto)
    );
  }
  //----------------------totales------------------------
  // total de venta sin descuento y sin iva de un array de productos
  totalSinDescuento(productos: Producto[]): number {
    return productos.reduce((total, producto) => {
      return total + this.totalPorProductoSinIva(producto);
    }, 0);
  }

  // total con descuento e iva aplicado a un producto
  totalPorProducto(producto: Producto): number {
    return this.totalPorProductoConDescuentoIva(producto);
  }

  // total de venta de un array de productos
  totalVenta(productos: Producto[]): number {
    return productos.reduce((total, producto) => {
      return total + this.totalPorProductoConDescuentoIva(producto);
    }, 0);
  }

  // total de descuento de un array de productos
  totalDescuentos(productos: Producto[]): number {
    return productos.reduce((total, producto) => {
      return total + this.totalDescuento(producto);
    }, 0);
  }

  // total de iva de un array de productos
  totalIva(productos: Producto[]): number {
    return productos.reduce((total, producto) => {
      return total + this.valorIva(producto);
    }, 0);
  }


  constructor() { }
}
