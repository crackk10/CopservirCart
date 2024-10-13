import { booleanAttribute, Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
//@ts-ignore
const $:any = window['$'] //para acceder al jquery
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent {
  @Input({transform: booleanAttribute}) controlado : boolean = false
  @Input() titulo: string = '';
  @Input() textoBoton: string = '';
  @Input({required:true}) accionAlGuardar! : () => void

  /* <div #modal></div> DONDE #modal es un id
     accedo al elemento con @ViewChild y lo asigno a la variable modalControlado
  */
  @ViewChild('modal') modalControlado? : ElementRef 
  tituloParametro : string = ''
  contenido : string = ''

  openModal(tituloParametro:string = '', contenido:string = ''){
    $(this.modalControlado?.nativeElement).modal('show') //la funcion modal es propia de bootstrap
    this.tituloParametro = tituloParametro
    this.contenido = contenido
  }    
    
  closeModal(){
    $(this.modalControlado?.nativeElement).modal('hide')
  }

  closeModalAndSave(){
    this.closeModal()
    this.accionAlGuardar()
  }
}

/* 
  Acceder desde el padre, agregar comportamiento, controlar parametros

  @ViewChild(ModalComponent) modal?:ModalComponent
  openModal(titulo:string = '', contenido:string =''){
    this.modal?.openModal(titulo, contenido)
    alert('Hacer alguna otra cosa al abrir')
  }

  accionAlGuardar(){
    alert('Hacer alguna otra cosa al guardar')
  }

  en el HTML, si se pasa el primer parametro en limpio no muestra header
  <app-modal [accionAlGuardar]="accionAlGuardar" controlado>Contenido</app-modal>
  <button (click)="openModal('Titulo contolado', 'Contenido')" type="button" class="btn btn-primary">Cliente</button>

 Para acceder de forma nativa solo hay que declarar el HTML, si no declara el titulo no muestra header
  <app-modal textoBoton="Cliente" titulo="Titulo" [accionAlGuardar]="accionAlGuardar" >Contenido</app-modal>

*/