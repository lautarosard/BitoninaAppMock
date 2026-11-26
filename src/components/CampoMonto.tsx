import { useId } from 'react'
import { formatearNumero, formatearPesos } from '../utils/format'
import { campo } from './estilos'

interface Props {
  etiqueta: string
  valor: number
  onCambiar: (valor: number) => void
}

const MAXIMO_DE_DIGITOS = 9

/** Monto en pesos enteros. Muestra los puntos de miles mientras se escribe. */
export default function CampoMonto({ etiqueta, valor, onCambiar }: Props) {
  const id = useId()

  return (
    <div className="print:flex print:justify-between">
      <label htmlFor={id} className="mb-1 block font-semibold">
        {etiqueta}
      </label>
      {/* En papel se muestra el importe como texto, no como un campo para completar. */}
      <span className="hidden font-bold print:block">{formatearPesos(valor)}</span>
      <div className="flex items-center gap-2 print:hidden">
        <span aria-hidden="true" className="text-3xl font-bold">
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={valor ? formatearNumero(valor) : ''}
          placeholder="0"
          onChange={(e) =>
            onCambiar(Number(e.target.value.replace(/\D/g, '').slice(0, MAXIMO_DE_DIGITOS)))
          }
          className={`${campo} text-right text-3xl font-bold`}
        />
      </div>
    </div>
  )
}
