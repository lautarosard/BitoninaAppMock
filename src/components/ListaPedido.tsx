import type { ItemPedido } from '../types'
import { subtotalLinea } from '../utils/boleta'
import { formatearPesos } from '../utils/format'
import { botonSecundario } from './estilos'

interface Props {
  items: ItemPedido[]
  onCambiarCantidad: (codigo: string, cantidad: number) => void
  onQuitar: (codigo: string) => void
}

const CANTIDAD_MAXIMA = 999

const botonCantidad = `${botonSecundario} min-h-14 w-16 text-3xl disabled:border-dashed disabled:bg-stone-200 disabled:text-stone-600`

export default function ListaPedido({ items, onCambiarCantidad, onQuitar }: Props) {
  if (items.length === 0) return <p>Todavía no agregaste productos.</p>

  return (
    <ul aria-label="Productos del pedido" className="space-y-3">
      {items.map((item) => {
        const { producto, cantidad } = item
        return (
          <li key={producto.codigo} className="rounded-lg border-2 border-stone-500 p-3">
            <h3 className="text-xl font-bold">{producto.nombre}</h3>
            <p className="font-mono text-base text-stone-800">Código: {producto.codigo}</p>
            <p>Precio unitario: {formatearPesos(producto.precio)}</p>

            <div
              role="group"
              aria-label={`Cantidad de ${producto.nombre}`}
              className="mt-3 flex items-center justify-between gap-2"
            >
              <span className="font-semibold">Cantidad</span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Restar uno"
                  disabled={cantidad <= 1}
                  onClick={() => onCambiarCantidad(producto.codigo, cantidad - 1)}
                  className={botonCantidad}
                >
                  −
                </button>
                <output className="min-w-14 text-center text-3xl font-bold">{cantidad}</output>
                <button
                  type="button"
                  aria-label="Sumar uno"
                  disabled={cantidad >= CANTIDAD_MAXIMA}
                  onClick={() => onCambiarCantidad(producto.codigo, cantidad + 1)}
                  className={botonCantidad}
                >
                  +
                </button>
              </span>
            </div>

            <p className="mt-3 flex flex-wrap justify-between gap-x-2">
              <span className="font-semibold">Subtotal</span>
              <strong className="text-2xl">{formatearPesos(subtotalLinea(item))}</strong>
            </p>
            <button
              type="button"
              onClick={() => onQuitar(producto.codigo)}
              aria-label={`Quitar ${producto.nombre}`}
              className={`${botonSecundario} mt-2 w-full`}
            >
              Quitar
            </button>
          </li>
        )
      })}
    </ul>
  )
}
