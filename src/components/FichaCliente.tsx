import type { Cliente } from '../types'
import { formatearPesos } from '../utils/format'
import { botonSecundario } from './estilos'

interface Props {
  cliente: Cliente
  onCambiar: () => void
}

export default function FichaCliente({ cliente, onCambiar }: Props) {
  return (
    <div className="rounded-lg border-2 border-stone-500 bg-stone-50 p-3">
      <p className="text-2xl font-bold">{cliente.nombre}</p>
      <dl className="mt-2 space-y-2">
        <div>
          <dt className="font-semibold">Teléfono</dt>
          <dd>{cliente.telefono}</dd>
        </div>
        <div>
          <dt className="font-semibold">Correo electrónico</dt>
          <dd className="break-all">{cliente.email}</dd>
        </div>
        {cliente.saldoAnterior > 0 && (
          <div className="rounded-lg border-2 border-amber-800 bg-amber-100 p-3">
            <dt className="font-semibold">Saldo anterior</dt>
            <dd>
              <span className="block text-2xl font-bold">
                {formatearPesos(cliente.saldoAnterior)}
              </span>
              Tiene deuda pendiente
            </dd>
          </div>
        )}
      </dl>
      <button type="button" onClick={onCambiar} className={`${botonSecundario} mt-3 w-full`}>
        Cambiar cliente
      </button>
    </div>
  )
}
