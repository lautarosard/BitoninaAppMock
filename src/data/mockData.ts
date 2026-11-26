import type { Cliente, Producto } from '../types'

export const PRIMER_NUMERO_COMPROBANTE = 71

export const clientes: Cliente[] = [
  {
    id: 'cli-1',
    nombre: 'Bitonina',
    telefono: '1150610548',
    email: 'gustavofabianm574@gmail.com',
    saldoAnterior: 63100,
  },
  {
    id: 'cli-2',
    nombre: 'Dietética La Espiga',
    telefono: '1145238790',
    email: 'compras@laespiga.example.com',
    saldoAnterior: 0,
  },
  {
    id: 'cli-3',
    nombre: 'Almacén Natural Don Pedro',
    telefono: '1167841122',
    email: 'donpedro@example.com',
    saldoAnterior: 28500,
  },
  {
    id: 'cli-4',
    nombre: 'Granero Verde',
    telefono: '1132906456',
    email: 'pedidos@graneroverde.example.com',
    saldoAnterior: 0,
  },
]

export const productos: Producto[] = [
  { codigo: 'ALM-NP-1K', nombre: 'Almendra Nonpareil 1 kg', precio: 26350 },
  { codigo: 'ALM-NP-500', nombre: 'Almendra Nonpareil 500 g', precio: 15150 },
  { codigo: 'NUZ-ML-1K', nombre: 'Nuez mariposa extra light 1 kg', precio: 20000 },
  { codigo: 'HAR-AVE-1K', nombre: 'Harina de avena 1 kg', precio: 3650 },
  { codigo: 'HAR-ALM-1K', nombre: 'Harina de almendras 1 kg', precio: 5200 },
  { codigo: 'SEM-CHI-1K', nombre: 'Semilla de chía 1 kg', precio: 9100 },
  { codigo: 'MIEL-DST-1K', nombre: 'Miel pura El Destino 1 kg', precio: 11000 },
  { codigo: 'FIT-JAS-6U', nombre: 'Jugo Fitoplus arándano stevia x6', precio: 12900 },
  { codigo: 'ORA-GRA-1K', nombre: 'Granola ORANN light 1 kg', precio: 6700 },
  { codigo: 'CHO-RCK-1K', nombre: 'Rocklets Arcor 1 kg', precio: 22550 },
]
