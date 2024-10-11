import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../interfaces/req-producto.interface';
import { HttpClient } from '@angular/common/http';
import { Contabilidad } from '../interfaces/req-contabilidad.interface';
@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {
  private apiUrl = "http://localhost:3000/copservir";
  constructor(private http: HttpClient) {}

  crearContabilidad():Observable<Contabilidad> {
    return this.http.post<any>(`${this.apiUrl}/contabilidad`,{});
  }

  getContabilidad (): Observable<Contabilidad>{
    return this.http.get<Contabilidad>(`${this.apiUrl}/contabilidad`)
  }

}