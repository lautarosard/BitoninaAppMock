import { formatearFecha } from '../utils/format'

interface Props {
  numeroComprobante: number
  fecha: Date
}

export default function Encabezado({ numeroComprobante, fecha }: Props) {
  return (
    <header className="bg-emerald-900 text-white">
      <div className="mx-auto max-w-lg px-4 py-5">
        <h1 className="text-3xl font-bold">Nueva Venta</h1>
        <dl className="mt-3 space-y-1">
          <div className="flex flex-wrap gap-x-2">
            <dt>Comprobante interno:</dt>
            <dd className="font-bold">#{numeroComprobante}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt>Fecha:</dt>
            <dd className="font-bold">{formatearFecha(fecha)}</dd>
          </div>
        </dl>
      </div>
    </header>
  )
}
