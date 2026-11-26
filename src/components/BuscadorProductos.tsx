import { useEffect, useRef, useState } from 'react'
import type { Producto } from '../types'
import { formatearPesos } from '../utils/format'
import { coincide, normalizar } from '../utils/search'
import { botonSecundario, campo, opcion } from './estilos'

interface Props {
  productos: Producto[]
  /** Devuelve la cantidad que queda en el pedido después de agregar. */
  onAgregar: (producto: Producto) => number
}

const DURACION_AVISO_MS = 4000

export default function BuscadorProductos({ productos, onAgregar }: Props) {
  const [texto, setTexto] = useState('')
  const [aviso, setAviso] = useState<{ mensaje: string } | null>(null)
  const input = useRef<HTMLInputElement>(null)

  const buscando = normalizar(texto) !== ''
  const resultados = buscando
    ? productos.filter((p) => coincide(`${p.codigo} ${p.nombre}`, texto))
    : []

  useEffect(() => {
    if (!aviso) return
    const temporizador = setTimeout(() => setAviso(null), DURACION_AVISO_MS)
    return () => clearTimeout(temporizador)
  }, [aviso])

  function limpiar() {
    setTexto('')
    input.current?.focus()
  }

  function agregar(producto: Producto) {
    const cantidad = onAgregar(producto)
    setAviso({ mensaje: `Agregado: ${producto.nombre} (cantidad: ${cantidad})` })
    limpiar()
  }

  return (
    <div>
      <label htmlFor="producto" className="mb-2 block font-semibold">
        Buscar producto
      </label>
      <input
        ref={input}
        id="producto"
        type="text"
        inputMode="search"
        value={texto}
        placeholder="Escribí código o nombre (ej: alm, har, nuez)..."
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onChange={(e) => {
          setTexto(e.target.value)
          setAviso(null)
        }}
        onKeyDown={(e) => e.key === 'Escape' && setTexto('')}
        className={campo}
      />
      <button type="button" onClick={limpiar} className={`${botonSecundario} mt-2 w-full`}>
        <span aria-hidden="true">✕ </span>
        Limpiar
      </button>

      {/* Siempre presente para que los lectores de pantalla anuncien el aviso. */}
      <div role="status">
        {aviso && (
          <p className="mt-2 rounded-lg border-2 border-emerald-800 bg-emerald-100 p-3 font-semibold">
            <span aria-hidden="true">✓ </span>
            {aviso.mensaje}
          </p>
        )}
        {buscando && resultados.length === 0 && (
          <p className="mt-2 font-semibold">No se encontraron productos.</p>
        )}
      </div>

      {resultados.length > 0 && (
        <ul aria-label="Productos encontrados" className="mt-3 space-y-3">
          {resultados.map((p) => (
            <li key={p.codigo}>
              <button type="button" onClick={() => agregar(p)} className={opcion}>
                <span className="block text-xl font-bold">{p.nombre}</span>
                <span className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded border border-stone-400 bg-stone-100 px-2 font-mono text-base text-stone-800">
                    {p.codigo}
                  </span>
                  <span className="text-2xl font-bold">{formatearPesos(p.precio)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
