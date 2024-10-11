import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Producto } from '../interfaces/req-producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/copservir/producto';
  constructor(private http: HttpClient) { }

  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      tap((productos) => this.productosSubject.next(productos.slice())) // Forzar una nueva referencia
    );
  }
  getProductoPorId(id: number): Observable<Producto | undefined> {
    return this.productos$.pipe(map((productos: Producto[]) => productos.find(producto => producto.id == id)))
  }
}
