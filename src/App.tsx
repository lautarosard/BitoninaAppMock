import { useEffect, useState } from 'react'
import NuevaVenta from './screens/NuevaVenta'
import VistaBoleta from './screens/VistaBoleta'
import type { Boleta } from './types'
import { guardarBoleta, siguienteNumero } from './utils/storage'

export default function App() {
  const [numero, setNumero] = useState(siguienteNumero)
  const [actual, setActual] = useState<{ boleta: Boleta; guardada: boolean } | null>(null)
  const viendoBoleta = actual !== null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [viendoBoleta])

  function guardar(boleta: Boleta) {
    setActual({ boleta, guardada: guardarBoleta(boleta) })
  }

  function generar(datos: Omit<Boleta, 'numero'>) {
    // Se vuelve a leer por si se generó otra boleta en otra pestaña.
    const asignado = Math.max(numero, siguienteNumero())
    guardar({ ...datos, numero: asignado })
    setNumero(asignado + 1)
  }

  // Al volver, NuevaVenta se monta de nuevo y empieza vacía.
  return actual ? (
    <VistaBoleta
      boleta={actual.boleta}
      guardada={actual.guardada}
      onCambiar={guardar}
      onNuevaVenta={() => setActual(null)}
    />
  ) : (
    <NuevaVenta numeroComprobante={numero} onGenerar={generar} />
  )
}
