/** Minúsculas y sin tildes, para que "arandano" encuentre "Arándano". */
export const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()

/** Cada palabra buscada debe aparecer en el texto, en cualquier orden. */
export function coincide(texto: string, busqueda: string) {
  const base = normalizar(texto)
  return normalizar(busqueda)
    .split(/\s+/)
    .every((palabra) => base.includes(palabra))
}
