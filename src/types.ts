export interface Cliente {
  id: string
  nombre: string
  telefono: string
  email: string
  /** Deuda previa en pesos. 0 si está al día. */
  saldoAnterior: number
}

export interface Producto {
  codigo: string
  nombre: string
  /** Precio unitario en pesos. */
  precio: number
}
