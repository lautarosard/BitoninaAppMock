import { useId } from 'react'
import { formatearNumero } from '../utils/format'
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
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {etiqueta}
      </label>
      <div className="flex items-center gap-2">
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
