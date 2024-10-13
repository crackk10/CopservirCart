import { booleanAttribute, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
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
 

  /* <div #modal></div> DONDE #modal es un id
     accedo al elemento con @ViewChild y lo asigno a la variable modalControlado
  */
  @ViewChild('modal') modalControlado? : ElementRef 
  tituloParametro : string = ''
  contenido : string = ''

  openModal( contenido:string = '',tituloParametro:string = '',){
    $(this.modalControlado?.nativeElement).modal('show') //la funcion modal es propia de bootstrap
    this.tituloParametro = tituloParametro
    this.contenido = contenido
  }    
    
  @Output() emmiter = new EventEmitter()

  closeModal(){
    this.emmiter.emit(false)
    $(this.modalControlado?.nativeElement).modal('hide')
  }
 
  closeModalAndSave(){
    $(this.modalControlado?.nativeElement).modal('hide')
    this.emmiter.emit(true)
  }
}

/* 
  Acceder desde el padre, agregar comportamiento, controlar parametros

  @ViewChild(ModalComponent) modal?:ModalComponent
  openModal( contenido:string ='',titulo:string = ''){
    this.modal?.openModal(contenido,titulo)
  }
  accionAlGuardar(guardo:boolean){
    if (guardo) {
     alert('logica si guarda') 
    }   
  }

  en el HTML, si se pasa el primer parametro de openModal en limpio no muestra header
  <app-modal controlado (emmiter)=accionAlGuardar($event)>
  <button (click)="openModal('Contenido','Titulo contolado')" type="button" class="btn btn-primary">NombreBoton</button>

  Para acceder de forma nativa 

  accionAlGuardar(guardo:boolean){
    if (guardo) {
     alert('logica si guarda') 
    }   
  }
  <app-modal textoBoton="Cliente" titulo="Titulo" (emmiter)=accionAlGuardar($event) >Contenido</app-modal>

*/