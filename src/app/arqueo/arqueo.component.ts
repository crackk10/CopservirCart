import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ContabilidadService } from "../core/services/contabilidad.service";
import { Contabilidad } from '../core/interfaces/req-contabilidad.interface';
import { Factura } from '../core/interfaces/req-factura.interface';
import { ThousandsPipe } from '../core/shared/pipes/thousandPipe.pipe';
@Component({
  selector: 'app-arqueo',
  standalone: true,
  imports: [CommonModule, ThousandsPipe],
  templateUrl: './arqueo.component.html',
  styles: ``
})
export class ArqueoComponent {
  private readonly contabilidadService = inject(ContabilidadService)
  showDiv = signal(false);
  toggleDiv() {
    this.showDiv.update((value) => !value);
  }
  facturas = signal<Factura[] | null>([])
  total = signal<Contabilidad>({
    id: 0,
    fecha:  new Date(),
    facturas: [],
    total:0,
    total_descuento:0,
    total_iva:0,
    total_neto:0,
  });
  verContabilidad(){   
    this.contabilidadService.getContabilidad().subscribe({
      next : (value)=>{
        this.facturas.set(value.facturas)
        this.total.set(value)
      }
    })
    // this.contabilidadService.crearContabilidad().subscribe()
  }
  cerrarContabilidad(){   
    this.contabilidadService.crearContabilidad().subscribe()
  }
}
