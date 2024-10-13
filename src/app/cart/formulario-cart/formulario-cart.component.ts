import {CommonModule} from "@angular/common";
import {Component, computed, inject, input, signal, ViewChild} from "@angular/core";
import {FormsModule,ReactiveFormsModule,} from "@angular/forms";
import {ProductoService} from "../../core/services/producto.service";
import {CartService} from "../../core/services/cart.service";
import { Producto } from "../../core/interfaces/req-producto.interface";
import { ModalComponent } from "../../core/shared/components/modal/modal.component";

@Component({
  selector: "app-formulario-cart",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ModalComponent],
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

  switchModal : number = 0

  @ViewChild(ModalComponent) modal?:ModalComponent
  openModal(titulo:string = '', contenido:string ='', numeroBoton : number){
    this.modal?.openModal(titulo, contenido)
    this.switchModal = numeroBoton 
  }
  accionAlGuardar(guardo:boolean){
    if (guardo) {
     if (this.switchModal == 0) {
      console.log("Hace algo con modulo cliente");
     }else{
      console.log("Hace algo con modulo FormasDePago");
     }
     
    }   
  }
}
