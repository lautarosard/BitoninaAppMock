# BitoninaApp

Prototipo (mock) de web app mobile-first para registrar ventas y generar boletas internas
en una distribuidora de dietética. Sin backend: los datos son estáticos.

## Stack y comandos

React + TypeScript + Vite + Tailwind CSS v4 (plugin de Vite, sin `tailwind.config`). Usar **pnpm**.

- `pnpm dev`: servidor de desarrollo
- `pnpm build`: chequeo de tipos y build de producción

## Arquitectura

- `src/screens/`: una pantalla por archivo (hoy solo `NuevaVenta`, sin router)
- `src/components/`: piezas de la pantalla; las clases de los controles están en `estilos.ts`
- `src/data/mockData.ts`: clientes, productos y primer número de comprobante (71)
- `src/types.ts`: tipos del dominio (`Cliente`, `Producto`, `ItemPedido`)
- `src/utils/format.ts`: formato de pesos y fechas en `es-AR`; no formatear a mano
- `src/utils/search.ts`: búsqueda que ignora tildes y mayúsculas
- `src/utils/dates.ts`: fechas en hora local; no usar `toISOString()`

Los montos son números enteros en pesos. El estado es local de React (`useState`).

## Reglas de UX (obligatorias)

El usuario principal es una persona mayor.

- Texto de 16px como mínimo (la base es 18px, `text-lg`). No usar `text-xs` ni `text-sm`.
- Botones, selectores y campos de 48px de alto como mínimo (`min-h-12` o más).
- Contraste alto: texto oscuro sobre fondo claro o blanco sobre color oscuro. Sin grises claros para texto.
- Etiquetas explícitas en español. Nunca un ícono solo sin texto.
- El color no es la única señal: acompañarlo con texto.
- Mobile-first, una sola columna (`mx-auto max-w-lg`). Sin barras laterales ni menús complejos.
- No bloquear el zoom en el `viewport`.

## Estado actual

Hecho: encabezado, autocompletado de cliente, vencimiento (+14 días), búsqueda de productos
y alta o baja en el pedido.
Pendiente: editar cantidades, total, boleta e incremento del número de comprobante.
