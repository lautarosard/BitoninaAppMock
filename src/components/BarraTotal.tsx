import { formatearPesos } from '../utils/format'
import { botonPrincipal } from './estilos'

interface Props {
  total: number
  /** Qué falta para poder generar la boleta, o null. */
  error: string | null
  onGenerar: () => void
}

export default function BarraTotal({ total, error, onGenerar }: Props) {
  return (
    <div className="sticky bottom-0 border-t-4 border-emerald-900 bg-white">
      <div className="mx-auto max-w-lg px-4 py-3">
        {error && (
          <p role="alert" className="mb-2 font-bold text-red-800">
            {error}
          </p>
        )}
        <p className="mb-2 flex flex-wrap items-baseline justify-between gap-x-2">
          <span className="font-semibold">Total de esta venta</span>
          <strong className="text-3xl">{formatearPesos(total)}</strong>
        </p>
        {/* Siempre habilitado: si falta algo, se explica en lugar de no responder. */}
        <button type="button" onClick={onGenerar} className={botonPrincipal}>
          Generar Boleta
        </button>
      </div>
    </div>
  )
}
