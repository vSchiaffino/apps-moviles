import { ScrollView, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { Product } from './TransferPage/WarehouseTransferPage'
import Container from '@/components/Container'
import Typography from '@/components/Typography'
import WarehouseCard from '@/components/WarehouseCard'
import { Ionicons } from '@expo/vector-icons'
import WarehouseCardList from '@/components/WarehouseCardList'
import Card from '@/components/Card'
import { Colors } from '@/constants/Colors'

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
    capacity: 165,
  },
  {
    id: 2,
    name: 'Depósito B',
    location: 'd',
    productList: products,
    capacity: 150,
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
      <Container style={{ gap: view ? 10 : 0, alignItems: 'center', height: '90%' }}>
        <Container
          style={{
            height: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 0,
            marginBottom: 10,
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
        {!view ? (
          <Card
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              aspectRatio: 25 / 3,
              minHeight: 'auto',
              backgroundColor: Colors.primary[200],
              padding: 10,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Typography
              variant="body"
              font="roboto"
              style={{ justifyContent: 'flex-start', width: '33%', color: Colors.primary[600] }}
            >
              NOMBRE
            </Typography>
            <Typography
              variant="body"
              justify="center"
              font="roboto"
              style={{ justifyContent: 'center', width: '33%', color: Colors.primary[600] }}
            >
              ESTADO
            </Typography>
            <Typography
              variant="body"
              justify="right"
              font="roboto"
              style={{ justifyContent: 'flex-end', width: '33%', color: Colors.primary[600] }}
            >
              CAPACIDAD
            </Typography>
          </Card>
        ) : undefined}
        {warehouses.map(({ id, name, location, productList, capacity }, index) => {
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
              last={index === warehouses.length - 1}
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
