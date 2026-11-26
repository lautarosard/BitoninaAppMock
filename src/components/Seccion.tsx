import { useId, type ReactNode } from 'react'

interface Props {
  titulo: string
  children: ReactNode
}

export default function Seccion({ titulo, children }: Props) {
  const idTitulo = useId()

  return (
    <section aria-labelledby={idTitulo} className="rounded-xl border-2 border-stone-400 bg-white p-4">
      <h2 id={idTitulo} className="mb-3 text-2xl font-bold">
        {titulo}
      </h2>
      {children}
    </section>
  )
}
