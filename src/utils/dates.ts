export function sumarDias(fecha: Date, dias: number) {
  const resultado = new Date(fecha)
  resultado.setDate(resultado.getDate() + dias)
  return resultado
}

/** "AAAA-MM-DD" en hora local. No usar toISOString(): convierte a UTC y puede cambiar el día. */
export function aValorInput(fecha: Date) {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${fecha.getFullYear()}-${mes}-${dia}`
}

export function desdeValorInput(valor: string) {
  const [anio, mes, dia] = valor.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}
