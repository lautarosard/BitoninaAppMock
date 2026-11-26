import { distribuidora } from '../data/mockData'
import type { Boleta } from '../types'
import { saldoRestante, subtotalCompra, subtotalLinea } from './boleta'
import { desdeValorInput } from './dates'
import { formatearFechaCorta, formatearPesos } from './format'

const fecha = (valor: string) => formatearFechaCorta(desdeValorInput(valor))

/** Texto para pegar en WhatsApp: los asteriscos se ven como negrita. */
export function resumenWhatsApp(boleta: Boleta) {
  return [
    `*${distribuidora.nombre}*`,
    `*Boleta #${boleta.numero}* (comprobante interno, no válido como factura)`,
    `Cliente: ${boleta.cliente.nombre}`,
    `Fecha de emisión: ${fecha(boleta.fechaEmision)}`,
    `Fecha de vencimiento: ${fecha(boleta.fechaVencimiento)}`,
    '',
    '*Detalle*',
    ...boleta.items.map(
      (item) =>
        `- ${item.producto.nombre}: ${item.cantidad} x ${formatearPesos(item.producto.precio)} = ${formatearPesos(subtotalLinea(item))}`,
    ),
    '',
    `Subtotal compra actual: ${formatearPesos(subtotalCompra(boleta.items))}`,
    `Saldo anterior: ${formatearPesos(boleta.saldoAnterior)}`,
    `Entrega a cuenta: ${formatearPesos(boleta.entregaACuenta)}`,
    `*Saldo restante: ${formatearPesos(saldoRestante(boleta))}*`,
  ].join('\n')
}
