import { useState } from 'react'
import BarraTotal from '../components/BarraTotal'
import BuscadorCliente from '../components/BuscadorCliente'
import BuscadorProductos from '../components/BuscadorProductos'
import CampoVencimiento from '../components/CampoVencimiento'
import Encabezado from '../components/Encabezado'
import FichaCliente from '../components/FichaCliente'
import ListaPedido from '../components/ListaPedido'
import Seccion from '../components/Seccion'
import { clientes, productos } from '../data/mockData'
import type { Boleta, Cliente, ItemPedido, Producto } from '../types'
import { subtotalCompra } from '../utils/boleta'
import { aValorInput, sumarDias } from '../utils/dates'

interface Props {
  numeroComprobante: number
  onGenerar: (datos: Omit<Boleta, 'numero'>) => void
}

const DIAS_DE_VENCIMIENTO = 14

const vencimientoPorDefecto = () => aValorInput(sumarDias(new Date(), DIAS_DE_VENCIMIENTO))

export default function NuevaVenta({ numeroComprobante, onGenerar }: Props) {
  const hoy = new Date()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [vencimiento, setVencimiento] = useState(vencimientoPorDefecto)
  const [items, setItems] = useState<ItemPedido[]>([])
  const [intentoGenerar, setIntentoGenerar] = useState(false)

  const problema = !cliente
    ? 'Falta elegir el cliente.'
    : items.length === 0
      ? 'Falta agregar al menos un producto.'
      : !vencimiento || vencimiento < aValorInput(hoy)
        ? 'Revisá la fecha de vencimiento: debe ser de hoy en adelante.'
        : null

  function cambiarCliente() {
    // El pedido se conserva: solo se limpian los datos del cliente.
    setCliente(null)
    setVencimiento(vencimientoPorDefecto())
  }

  function cambiarCantidad(codigo: string, cantidad: number) {
    setItems(items.map((i) => (i.producto.codigo === codigo ? { ...i, cantidad } : i)))
  }

  function agregarProducto(producto: Producto) {
    const actual = items.find((i) => i.producto.codigo === producto.codigo)
    const cantidad = (actual?.cantidad ?? 0) + 1
    if (actual) cambiarCantidad(producto.codigo, cantidad)
    else setItems([...items, { producto, cantidad }])
    return cantidad
  }

  function generar() {
    setIntentoGenerar(true)
    if (problema || !cliente) return
    onGenerar({
      fechaEmision: aValorInput(new Date()),
      fechaVencimiento: vencimiento,
      cliente,
      items,
      saldoAnterior: cliente.saldoAnterior,
      entregaACuenta: 0,
    })
  }

  return (
    <>
      <Encabezado numeroComprobante={numeroComprobante} fecha={hoy} />

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

        <Seccion titulo="3. Detalle del pedido">
          <ListaPedido
            items={items}
            onCambiarCantidad={cambiarCantidad}
            onQuitar={(codigo) => setItems(items.filter((i) => i.producto.codigo !== codigo))}
          />
        </Seccion>
      </main>

      <BarraTotal
        total={subtotalCompra(items)}
        error={intentoGenerar ? problema : null}
        onGenerar={generar}
      />
    </>
  )
}
