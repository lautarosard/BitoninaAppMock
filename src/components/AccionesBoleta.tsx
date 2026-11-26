import { useEffect, useState } from 'react'
import type { Boleta } from '../types'
import { resumenWhatsApp } from '../utils/resumen'
import { botonPrincipal, botonSecundario, campo } from './estilos'

/** El nombre del documento es el nombre sugerido para el PDF. */
function useTituloDocumento(titulo: string) {
  useEffect(() => {
    const anterior = document.title
    document.title = titulo
    return () => {
      document.title = anterior
    }
  }, [titulo])
}

export default function AccionesBoleta({ boleta }: { boleta: Boleta }) {
  const [resultado, setResultado] = useState<{ texto: string; copiado: boolean } | null>(null)
  const texto = resumenWhatsApp(boleta)
  // Si se cambia un monto, el aviso anterior deja de valer: lo copiado quedó viejo.
  const vigente = resultado?.texto === texto ? resultado : null

  useTituloDocumento(`Boleta ${boleta.numero} - ${boleta.cliente.nombre}`)

  async function copiar() {
    try {
      // Solo existe en https o localhost; si falta, se ofrece copiar a mano.
      await navigator.clipboard.writeText(texto)
      setResultado({ texto, copiado: true })
    } catch {
      setResultado({ texto, copiado: false })
    }
  }

  return (
    <div className="space-y-3 print:hidden">
      <button type="button" onClick={() => window.print()} className={botonPrincipal}>
        Descargar / Imprimir PDF
      </button>
      <button type="button" onClick={copiar} className={`${botonSecundario} min-h-14 w-full text-xl`}>
        Copiar resumen para WhatsApp
      </button>

      <div role="status">
        {vigente?.copiado && (
          <p className="rounded-lg border-2 border-emerald-800 bg-emerald-100 p-3 font-bold">
            <span aria-hidden="true">✓ </span>
            Copiado. Ahora pegalo en el chat de WhatsApp.
          </p>
        )}
        {vigente && !vigente.copiado && (
          <p className="font-bold text-red-800">
            No se pudo copiar solo. Mantené apretado el texto de abajo para copiarlo.
          </p>
        )}
      </div>

      {vigente && !vigente.copiado && (
        <textarea
          aria-label="Resumen para WhatsApp"
          readOnly
          rows={12}
          value={texto}
          onFocus={(e) => e.target.select()}
          className={`${campo} py-2`}
        />
      )}
    </div>
  )
}
