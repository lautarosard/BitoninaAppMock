const pesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

const fechaLarga = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const fechaCorta = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const numero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

export const formatearNumero = (valor: number) => numero.format(valor)

export const formatearFechaCorta = (fecha: Date) => fechaCorta.format(fecha)

export const formatearPesos =(monto: number) => pesos.format(monto)

export const formatearFecha = (fecha: Date) => fechaLarga.format(fecha)
