import { useState } from 'react'
import Encabezado from '../components/Encabezado'
import Seccion from '../components/Seccion'
import { clientes, PRIMER_NUMERO_COMPROBANTE } from '../data/mockData'
import { formatearPesos } from '../utils/format'

export default function NuevaVenta() {
  const [clienteId, setClienteId] = useState('')
  const cliente = clientes.find((c) => c.id === clienteId)

  return (
    <>
      <Encabezado numeroComprobante={PRIMER_NUMERO_COMPROBANTE} fecha={new Date()} />

      <main className="mx-auto max-w-lg space-y-4 px-4 py-4">
        <Seccion titulo="1. Cliente">
          <label htmlFor="cliente" className="mb-2 block font-semibold">
            Elegir cliente
          </label>
          <select
            id="cliente"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="min-h-14 w-full rounded-lg border-2 border-stone-700 bg-white px-3 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <option value="">Seleccione un cliente…</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          {cliente && (
            <dl className="mt-4 space-y-2">
              <div>
                <dt className="font-semibold">Teléfono</dt>
                <dd>{cliente.telefono}</dd>
              </div>
              <div>
                <dt className="font-semibold">Correo electrónico</dt>
                <dd className="break-all">{cliente.email}</dd>
              </div>
              <div
                className={`rounded-lg border-2 p-3 ${
                  cliente.saldoAnterior > 0
                    ? 'border-amber-800 bg-amber-100'
                    : 'border-emerald-800 bg-emerald-100'
                }`}
              >
                <dt className="font-semibold">Saldo anterior</dt>
                <dd>
                  <span className="block text-2xl font-bold">
                    {formatearPesos(cliente.saldoAnterior)}
                  </span>
                  {cliente.saldoAnterior > 0 ? 'Tiene deuda pendiente' : 'Está al día'}
                </dd>
              </div>
            </dl>
          )}
        </Seccion>

        <Seccion titulo="2. Productos">
          <p>Todavía no se pueden agregar productos. Es el próximo paso del prototipo.</p>
        </Seccion>

        <Seccion titulo="3. Total y boleta">
          <p>El total y la boleta se mostrarán aquí cuando la venta tenga productos.</p>
        </Seccion>
      </main>
    </>
  )
}
