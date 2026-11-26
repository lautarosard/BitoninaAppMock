# BitoninaApp

Prototipo (mock) de web app mobile-first para registrar ventas y generar boletas internas
en una distribuidora de dietética. Sin backend: los datos son estáticos.

## Stack y comandos

React + TypeScript + Vite + Tailwind CSS v4 (plugin de Vite, sin `tailwind.config`). Usar **pnpm**.

- `pnpm dev`: servidor de desarrollo
- `pnpm lint`: ESLint, sin tolerar advertencias
- `pnpm build`: lint, chequeo de tipos y build de producción (lo mismo que corre Vercel)

TypeScript queda fijado en 6.0: `typescript-eslint` todavía no admite la versión 7.

## Impresión y despliegue

- La boleta se imprime en A4: marcar con `print:hidden` todo lo que no vaya en papel.
- `src/utils/resumen.ts` arma el texto para WhatsApp.
- `vercel.json` redirige cualquier ruta a `index.html`.

## Arquitectura

- `src/screens/`: una pantalla por archivo (`NuevaVenta`, `VistaBoleta`); `App.tsx` cambia entre ellas, sin router
- `src/utils/boleta.ts`: cálculos de importes (única fuente de las fórmulas)
- `src/utils/storage.ts`: boletas en `localStorage`; el número siguiente se deduce de lo guardado
- `src/components/`: piezas de la pantalla; las clases de los controles están en `estilos.ts`
- `src/data/mockData.ts`: clientes, productos y primer número de comprobante (71)
- `src/types.ts`: tipos del dominio (`Cliente`, `Producto`, `ItemPedido`, `Boleta`, `Distribuidora`)
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

## Términos de la cuenta corriente (obligatorios)

"Subtotal compra actual", "Saldo anterior", "Entrega a cuenta" y "Saldo restante".
Nunca usar "saldo adeudado". Saldo restante = Subtotal + Saldo anterior − Entrega a cuenta.

## Estado actual

Hecho: flujo completo de venta (cliente, productos, cantidades, total, boleta y guardado),
impresión o PDF y resumen para WhatsApp.
Pendiente: datos reales de la distribuidora, historial de boletas y trasladar el saldo
restante a la próxima venta del cliente.
