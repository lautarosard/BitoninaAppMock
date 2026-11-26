import type { Boleta, ItemPedido } from '../types'

export const subtotalLinea = ({ producto, cantidad }: ItemPedido) => producto.precio * cantidad

export const subtotalCompra = (items: ItemPedido[]) =>
  items.reduce((total, item) => total + subtotalLinea(item), 0)

/** Negativo significa que la entrega superó el total: queda a favor del cliente. */
export const saldoRestante = (boleta: Boleta) =>
  subtotalCompra(boleta.items) + boleta.saldoAnterior - boleta.entregaACuenta
