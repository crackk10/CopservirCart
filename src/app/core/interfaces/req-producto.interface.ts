export interface Producto{
  id: number
  nombre: string
  precio_base: number
  iva:number
  descuento:number
  descripcion: string
  estado:string
  imagen: string
  enStock:number
  cantidad:number|null
}