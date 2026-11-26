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

export const formatearPesos = (monto: number) => pesos.format(monto)

export const formatearFecha = (fecha: Date) => fechaLarga.format(fecha)
