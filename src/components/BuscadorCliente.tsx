import { useState } from 'react'
import type { Cliente } from '../types'
import { coincide } from '../utils/search'
import { campo, opcion } from './estilos'

interface Props {
  clientes: Cliente[]
  onElegir: (cliente: Cliente) => void
}

export default function BuscadorCliente({ clientes, onElegir }: Props) {
  const [texto, setTexto] = useState('')
  const [abierta, setAbierta] = useState(false)
  const resultados = clientes.filter((c) => coincide(c.nombre, texto))

  return (
    // La lista va en el flujo de la página y no se cierra al perder el foco:
    // así un toque en el teléfono nunca la hace desaparecer antes de elegir.
    <div onKeyDown={(e) => e.key === 'Escape' && setAbierta(false)}>
      <label htmlFor="cliente" className="mb-2 block font-semibold">
        Buscar o elegir cliente
      </label>
      <input
        id="cliente"
        type="text"
        value={texto}
        placeholder="Escribí el nombre…"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        onFocus={() => setAbierta(true)}
        onClick={() => setAbierta(true)}
        onChange={(e) => {
          setTexto(e.target.value)
          setAbierta(true)
        }}
        className={campo}
      />

      {abierta &&
        (resultados.length > 0 ? (
          <ul aria-label="Clientes" className="mt-2 space-y-2">
            {resultados.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => onElegir(c)} className={`${opcion} font-bold`}>
                  {c.nombre}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="mt-2 font-semibold">
            No hay clientes con ese nombre.
          </p>
        ))}
    </div>
  )
}
