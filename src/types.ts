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

export interface ItemPedido {
  producto: Producto
  cantidad: number
}

export interface Distribuidora {
  nombre: string
  direccion: string
  telefono: string
  email: string
}

/** Copia de los datos al momento de la venta: no cambia si cambian precios o clientes. */
export interface Boleta {
  numero: number
  /** Fechas en formato "AAAA-MM-DD", hora local. */
  fechaEmision: string
  fechaVencimiento: string
  cliente: Cliente
  items: ItemPedido[]
  saldoAnterior: number
  entregaACuenta: number
}
