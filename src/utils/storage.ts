import { PRIMER_NUMERO_COMPROBANTE } from '../data/mockData'
import type { Boleta } from '../types'

const CLAVE = 'bitonina.boletas'

export function leerBoletas(): Boleta[] {
  let texto: string | null = null
  try {
    texto = localStorage.getItem(CLAVE)
    const datos: unknown = JSON.parse(texto ?? '[]')
    if (Array.isArray(datos)) return datos as Boleta[]
  } catch {
    // Sin acceso a localStorage o contenido dañado: se maneja abajo.
  }
  // Se guarda una copia del contenido dañado antes de que se sobrescriba.
  try {
    if (texto) localStorage.setItem(`${CLAVE}.respaldo`, texto)
  } catch {
    // No hay dónde respaldar.
  }
  return []
}

/** Agrega la boleta o la actualiza si ya existe. Devuelve false si no se pudo guardar. */
export function guardarBoleta(boleta: Boleta) {
  const otras = leerBoletas().filter((b) => b.numero !== boleta.numero)
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...otras, boleta]))
    return true
  } catch {
    return false
  }
}

/** El número siguiente se deduce de lo guardado: no hay un contador aparte que se desfase. */
export const siguienteNumero = () =>
  leerBoletas().reduce((mayor, b) => Math.max(mayor, b.numero + 1), PRIMER_NUMERO_COMPROBANTE)
