import { desdeValorInput } from '../utils/dates'
import { formatearFecha } from '../utils/format'
import { campo } from './estilos'

interface Props {
  valor: string
  minimo: string
  onCambiar: (valor: string) => void
}

export default function CampoVencimiento({ valor, minimo, onCambiar }: Props) {
  const error = !valor
    ? 'Falta la fecha de vencimiento.'
    : valor < minimo
      ? 'Atención: la fecha de vencimiento es anterior a hoy.'
      : null

  return (
    <div className="mt-4">
      <label htmlFor="vencimiento" className="mb-2 block font-semibold">
        Fecha de vencimiento
      </label>
      <input
        id="vencimiento"
        type="date"
        value={valor}
        min={minimo}
        onChange={(e) => onCambiar(e.target.value)}
        aria-invalid={error !== null}
        aria-describedby="vencimiento-detalle"
        className={campo}
      />
      {/* La fecha escrita en palabras evita confundir día y mes. */}
      <p id="vencimiento-detalle" className={error ? 'mt-2 font-bold text-red-800' : 'mt-2'}>
        {error ?? `Vence el ${formatearFecha(desdeValorInput(valor))}`}
      </p>
    </div>
  )
}
