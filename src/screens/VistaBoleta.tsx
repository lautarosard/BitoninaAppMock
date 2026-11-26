import CampoMonto from '../components/CampoMonto'
import { botonPrincipal } from '../components/estilos'
import { distribuidora } from '../data/mockData'
import type { Boleta } from '../types'
import { saldoRestante, subtotalCompra, subtotalLinea } from '../utils/boleta'
import { desdeValorInput } from '../utils/dates'
import { formatearFechaCorta, formatearPesos } from '../utils/format'

interface Props {
  boleta: Boleta
  guardada: boolean
  onCambiar: (boleta: Boleta) => void
  onNuevaVenta: () => void
}

const fecha = (valor: string) => formatearFechaCorta(desdeValorInput(valor))

export default function VistaBoleta({ boleta, guardada, onCambiar, onNuevaVenta }: Props) {
  const { cliente, items } = boleta
  const restante = saldoRestante(boleta)

  return (
    <main className="mx-auto max-w-lg space-y-4 px-4 py-4">
      <p
        role="status"
        className={`rounded-lg border-2 p-3 font-bold ${
          guardada ? 'border-emerald-800 bg-emerald-100' : 'border-red-800 bg-red-100'
        }`}
      >
        {guardada
          ? `Boleta #${boleta.numero} guardada en este dispositivo.`
          : 'Atención: no se pudo guardar la boleta en este dispositivo. Anotá los datos.'}
      </p>

      <article className="rounded-xl border-2 border-stone-500 bg-white p-4">
        <header className="border-b-4 border-stone-900 pb-3">
          <p className="text-xl font-bold">{distribuidora.nombre}</p>
          <p>{distribuidora.direccion}</p>
          <p>Teléfono: {distribuidora.telefono}</p>
          <p className="break-all">{distribuidora.email}</p>
          <h1 className="mt-3 text-3xl font-bold">Boleta #{boleta.numero}</h1>
          <p className="font-semibold">Comprobante interno. No válido como factura.</p>
          <dl className="mt-2">
            <div className="flex flex-wrap justify-between gap-x-2">
              <dt>Fecha de emisión</dt>
              <dd className="font-bold">{fecha(boleta.fechaEmision)}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-x-2">
              <dt>Fecha de vencimiento</dt>
              <dd className="font-bold">{fecha(boleta.fechaVencimiento)}</dd>
            </div>
          </dl>
        </header>

        <section aria-label="Datos del cliente" className="border-b-2 border-stone-400 py-3">
          <h2 className="font-semibold">Cliente</h2>
          <p className="text-xl font-bold">{cliente.nombre}</p>
          <p>Teléfono: {cliente.telefono}</p>
          <p className="break-all">Correo: {cliente.email}</p>
        </section>

        {/* El nombre ocupa una fila entera para que los importes entren en un teléfono. */}
        <table className="mt-3 w-full text-base">
          <caption className="sr-only">Productos de la boleta</caption>
          <thead>
            <tr className="border-b-2 border-stone-900">
              <th scope="col" className="py-1 text-left">
                Cantidad
              </th>
              <th scope="col" className="py-1 text-right">
                Unitario
              </th>
              <th scope="col" className="py-1 text-right">
                Subtotal
              </th>
            </tr>
          </thead>
          {items.map((item) => (
            <tbody key={item.producto.codigo} className="border-b border-stone-400">
              <tr>
                <th scope="rowgroup" colSpan={3} className="pt-2 text-left">
                  {item.producto.nombre}
                </th>
              </tr>
              <tr>
                <td className="pb-2">{item.cantidad}</td>
                <td className="pb-2 text-right">{formatearPesos(item.producto.precio)}</td>
                <td className="pb-2 text-right font-bold">
                  {formatearPesos(subtotalLinea(item))}
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <section aria-labelledby="titulo-cuenta" className="mt-4 border-t-4 border-stone-900 pt-3">
          <h2 id="titulo-cuenta" className="mb-3 text-2xl font-bold">
            Cuenta corriente
          </h2>
          <p className="mb-3 flex flex-wrap justify-between gap-x-2">
            <span className="font-semibold">Subtotal compra actual</span>
            <strong className="text-2xl">{formatearPesos(subtotalCompra(items))}</strong>
          </p>
          <div className="space-y-3">
            <CampoMonto
              etiqueta="Saldo anterior"
              valor={boleta.saldoAnterior}
              onCambiar={(saldoAnterior) => onCambiar({ ...boleta, saldoAnterior })}
            />
            <CampoMonto
              etiqueta="Entrega a cuenta"
              valor={boleta.entregaACuenta}
              onCambiar={(entregaACuenta) => onCambiar({ ...boleta, entregaACuenta })}
            />
          </div>
          <div className="mt-4 rounded-lg border-4 border-stone-900 p-3">
            <p className="flex flex-wrap items-baseline justify-between gap-x-2">
              <span className="font-bold">Saldo restante</span>
              <output className="text-3xl font-bold">{formatearPesos(restante)}</output>
            </p>
            {restante < 0 && (
              <p className="font-semibold">
                La entrega supera el total: la diferencia queda a favor del cliente.
              </p>
            )}
          </div>
        </section>
      </article>

      <button type="button" onClick={onNuevaVenta} className={botonPrincipal}>
        Nueva Venta
      </button>
    </main>
  )
}
