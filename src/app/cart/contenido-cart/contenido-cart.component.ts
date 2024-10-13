import { Component, effect, inject, input } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { Producto } from '../../core/interfaces/req-producto.interface';
import { FormsModule } from '@angular/forms';
import { CalculadoraDePreciosService } from '../../core/services/calculadora-de-precios.service';
import { ThousandsPipe } from '../../core/shared/pipes/thousandPipe.pipe';

@Component({
  selector: 'app-contenido-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ThousandsPipe],
  templateUrl: './contenido-cart.component.html',
  styles: ``
})
export class ContenidoCartComponent {
  constructor(){
    effect(()=> {}) 
  }
  items = input<string>()
  private readonly calcladoraService = inject(CalculadoraDePreciosService)
  private readonly cartService = inject(CartService)
  data = this.cartService.productos$

  actualizarCantidad(idProducto: number, nuevaCantidad: string): void {
    this.cartService.modificarcantidadProducto(idProducto, Number(nuevaCantidad));
  }

  eliminarProducto(idProducto: number): void {
    this.cartService.eliminarProducto(idProducto);
  }

  calcularTotal(producto: Producto): number {
    return Math.trunc(  this.calcladoraService.totalPorProducto(producto)  );
  }
  cantidad : number = 0
  total : number = 0
}
