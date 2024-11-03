import { View, Text } from 'react-native'
import React from 'react'
import { Product } from './TransferPage/WarehouseTransferPage'
import Container from '@/components/Container'
import Card from '@/components/Card'
import Typography from '@/components/Typography'
import { Spacing } from '@/constants/Spacing'

export interface Warehouse {
  id: number
  name?: string
  location: string
  productList?: Product[]
  capacity: number
}

const products: Product[] = [
  { name: 'Product 1', stock: 10 },
  { name: 'Product 2', stock: 20 },
  { name: 'Product 3', stock: 30 },
  { name: 'Product 4', stock: 40 },
  { name: 'Product 5', stock: 50 },
]

const warehouses: Warehouse[] = [
  {
    id: 1,
    name: 'Depósito A',
    location: 'Alicia Moreau de Justo 1189',
    productList: products,
    capacity: 150,
  },
  {
    id: 2,
    name: 'Depósito B',
    location: 'd',
    productList: products,
    capacity: 300,
  },
  {
    id: 3,
    location: 'd',
    capacity: 300,
  },
]

const WarehousePage = () => {
  return (
    <Container style={{ gap: Spacing.rowGap }}>
      <Typography variant="h3">Depósitos</Typography>
      {warehouses.map(({ id, name, location, productList, capacity }) => {
        let productsAmount = 0
        const res = productList?.forEach((p) => (productsAmount += p.stock))
        return (
          <Card key={id} style={{ height: 'auto' }}>
            <Typography variant="body">{id}</Typography>
            <Typography variant="body">{name ? name : 'Depósito ' + location}</Typography>
            <Typography variant="body">{location}</Typography>
            <Typography variant="body">{capacity}</Typography>
            <Typography variant="body">{productsAmount}</Typography>
          </Card>
        )
      })}
    </Container>
  )
}

export default WarehousePage
