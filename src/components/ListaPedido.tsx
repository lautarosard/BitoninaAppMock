import type { ItemPedido } from '../types'
import { formatearPesos } from '../utils/format'
import { botonSecundario } from './estilos'

interface Props {
  items: ItemPedido[]
  onQuitar: (codigo: string) => void
}

export default function ListaPedido({ items, onQuitar }: Props) {
  if (items.length === 0) return <p>Todavía no agregaste productos.</p>

  return (
    <ul aria-label="Productos del pedido" className="divide-y-2 divide-stone-300">
      {items.map(({ producto, cantidad }) => (
        <li key={producto.codigo} className="py-3 first:pt-0 last:pb-0">
          <p className="font-bold">{producto.nombre}</p>
          <p>
            Cantidad: <strong>{cantidad}</strong> × {formatearPesos(producto.precio)}
          </p>
          <p>
            Subtotal: <strong>{formatearPesos(cantidad * producto.precio)}</strong>
          </p>
          <button
            type="button"
            onClick={() => onQuitar(producto.codigo)}
            aria-label={`Quitar producto ${producto.nombre}`}
            className={`${botonSecundario} mt-2`}
          >
            Quitar producto
          </button>
        </li>
      ))}
    </ul>
  )
}
