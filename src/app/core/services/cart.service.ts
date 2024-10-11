import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Producto} from "../interfaces/req-producto.interface";
@Injectable({
  providedIn: "root",
})
export class CartService {
  private arrayProductos: Producto[];
  private observableProductos$: Subject<Producto[]>;

  constructor() {
    this.arrayProductos = [];
    this.observableProductos$ = new Subject<Producto[]>();
  }

  get productos$() {
    return this.observableProductos$.asObservable();
  } 

  eliminarProducto(idProducto: number): void {
    this.arrayProductos = this.arrayProductos.filter(
      producto => producto.id !== idProducto
    );
    this.notificarCambioProductos();
  }

  vaciarCarrito(): void {
    this.arrayProductos = [];
    this.notificarCambioProductos();  
  }

  modificarcantidadProducto(idProducto: number, nuevoValor: number): void {
    this.arrayProductos = this.arrayProductos.map((producto) => {
      if (producto.id === idProducto) {
        return {...producto, ["cantidad"]: nuevoValor};
      }
      return producto;
    });
    this.notificarCambioProductos();
  }

  set agregarProducto(productoNuevo: Producto | undefined) {
    if (!productoNuevo?.id) {//verifico que el producto traiga id y no sea undefined
      return;
    }
    const indexProducto = this.buscarProductoPorId(productoNuevo.id);
    if (indexProducto !== -1) {
      this.actualizarProductoExistente(indexProducto, productoNuevo);
    } else {
      this.arrayProductos = [...this.arrayProductos, productoNuevo];
    }
    this.notificarCambioProductos();
  }
  private buscarProductoPorId(id: number): number {
    return this.arrayProductos.findIndex((producto) => producto.id === id);
  }
  private actualizarProductoExistente(index: number, productoNuevo: Producto): void {
    const productoExistente = this.arrayProductos[index];
    const nuevaCantidad = (productoExistente.cantidad || 0) + (productoNuevo.cantidad || 0);
    this.arrayProductos[index] = {...productoExistente, cantidad: nuevaCantidad};
  }
  private notificarCambioProductos(): void {
    this.observableProductos$.next(this.arrayProductos);
  }
  
}
