import { useState } from 'react'
import BuscadorCliente from '../components/BuscadorCliente'
import BuscadorProductos from '../components/BuscadorProductos'
import CampoVencimiento from '../components/CampoVencimiento'
import Encabezado from '../components/Encabezado'
import FichaCliente from '../components/FichaCliente'
import ListaPedido from '../components/ListaPedido'
import Seccion from '../components/Seccion'
import { clientes, PRIMER_NUMERO_COMPROBANTE, productos } from '../data/mockData'
import type { Cliente, ItemPedido, Producto } from '../types'
import { aValorInput, sumarDias } from '../utils/dates'

const DIAS_DE_VENCIMIENTO = 14

const vencimientoPorDefecto = () => aValorInput(sumarDias(new Date(), DIAS_DE_VENCIMIENTO))

export default function NuevaVenta() {
  const hoy = new Date()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [vencimiento, setVencimiento] = useState(vencimientoPorDefecto)
  const [items, setItems] = useState<ItemPedido[]>([])

  function cambiarCliente() {
    // El pedido se conserva: solo se limpian los datos del cliente.
    setCliente(null)
    setVencimiento(vencimientoPorDefecto())
  }

  function agregarProducto(producto: Producto) {
    const actual = items.find((i) => i.producto.codigo === producto.codigo)
    const cantidad = (actual?.cantidad ?? 0) + 1
    setItems(
      actual
        ? items.map((i) => (i === actual ? { producto, cantidad } : i))
        : [...items, { producto, cantidad }],
    )
    return cantidad
  }

  return (
    <>
      <Encabezado numeroComprobante={PRIMER_NUMERO_COMPROBANTE} fecha={hoy} />

      <main className="mx-auto max-w-lg space-y-4 px-4 py-4">
        <Seccion titulo="1. Cliente">
          {cliente ? (
            <FichaCliente cliente={cliente} onCambiar={cambiarCliente} />
          ) : (
            <BuscadorCliente clientes={clientes} onElegir={setCliente} />
          )}
          <CampoVencimiento
            valor={vencimiento}
            minimo={aValorInput(hoy)}
            onCambiar={setVencimiento}
          />
        </Seccion>

        <Seccion titulo="2. Agregar Productos">
          <BuscadorProductos productos={productos} onAgregar={agregarProducto} />
        </Seccion>

        <Seccion titulo="3. Pedido">
          <ListaPedido
            items={items}
            onQuitar={(codigo) => setItems(items.filter((i) => i.producto.codigo !== codigo))}
          />
        </Seccion>

        <Seccion titulo="4. Total y boleta">
          <p>El total y la boleta son el próximo paso del prototipo.</p>
        </Seccion>
      </main>
    </>
  )
}
