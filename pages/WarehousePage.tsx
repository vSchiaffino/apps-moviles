import { ScrollView, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { Product } from './TransferPage/WarehouseTransferPage'
import Container from '@/components/Container'
import Typography from '@/components/Typography'
import WarehouseCard from '@/components/WarehouseCard'
import { Ionicons } from '@expo/vector-icons'
import WarehouseCardList from '@/components/WarehouseCardList'

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
  {
    id: 4,
    location: 'd',
    capacity: 300,
  },
  {
    id: 5,
    location: 'Alicia Moreau de Justo 1189',
    capacity: 300,
  },
]

const WarehousePage = () => {
  const [view, setView] = useState(false)
  function toggleView() {
    setView((prev) => !prev)
  }

  return (
    <ScrollView>
      <Container style={{ gap: 10, alignItems: 'center', height: '90%' }}>
        <Container
          style={{
            height: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 0,
          }}
        >
          <Typography variant="h3">Depósitos</Typography>
          <TouchableHighlight
            underlayColor={'rgba(1,1,1,0.05)'}
            style={{ borderRadius: 999, padding: 10 }}
            onPress={() => toggleView()}
            hitSlop={20}
          >
            {view ? (
              <Ionicons name="grid-outline" size={24} color="grey" />
            ) : (
              <Ionicons name="list-outline" size={24} color="grey" />
            )}
          </TouchableHighlight>
        </Container>
        {warehouses.map(({ id, name, location, productList, capacity }) => {
          let productsAmount = 0
          const res = productList?.forEach((p) => (productsAmount += p.stock))
          return view ? (
            <WarehouseCard
              key={id}
              warehouseName={name}
              location={location}
              capacity={capacity}
              productsAmount={productsAmount}
            />
          ) : (
            <WarehouseCardList
              key={id}
              warehouseName={name}
              location={location}
              capacity={capacity}
              productsAmount={productsAmount}
            />
          )
        })}
      </Container>
    </ScrollView>
  )
}

export default WarehousePage
