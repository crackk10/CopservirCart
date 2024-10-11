import {CommonModule} from "@angular/common";
import {Component, inject, input, signal} from "@angular/core";
import {FormsModule,ReactiveFormsModule,} from "@angular/forms";
import {ProductoService} from "../../core/services/producto.service";
import {CartService} from "../../core/services/cart.service";
import { Producto } from "../../core/interfaces/req-producto.interface";

@Component({
  selector: "app-formulario-cart",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: "./formulario-cart.component.html",
  styles: ``,
})
export class FormularioCartComponent  {
  private readonly cartService = inject(CartService)
  private readonly productoService = inject(ProductoService)

  listaProductos$ = input<Producto[]>([],{})
  formInvalid = signal<boolean>(false)
  filtro! : string
  
  gestionar() {//cuando envio el formulario al presionar enter
    if (this.esNumero(this.filtro)) {
      let producto : Producto | undefined
      this.productoService.getProductoPorId(Number(this.filtro)).subscribe({
        next: value => producto = value
      });      
      this.cartService.agregarProducto = {...producto!, cantidad: 1};
      this.resetForm()
    } else {
      this.formInvalid.set(true)
    }
  }
  esNumero(value: string) {
    const regex = /^[0-9]+$/;
    return regex.test(value) ? true : false;
  }
  resetForm(){
    this.filtro = ''
    this.formInvalid.set(false)
  }
}
