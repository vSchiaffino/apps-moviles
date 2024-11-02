import { View, Text } from 'react-native'
import React from 'react'
import { Product } from './TransferPage/WarehouseTransferPage'
import Container from '@/components/Container'
import Card from '@/components/Card'

export interface Warehouse {
    id: number,
    location: string,
    productList?: Product[],
    capacity: number,

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
        id : 1,
        location: 'Alicia Moreau de Justo 1189',
        productList: products,
        capacity: 150
    },
    {
        id: 2,
        location: 'd',
        productList: products,
        capacity: 300
    },
    {
        id: 3,
        location: 'd',
        productList: products,
        capacity: 300
    },
]

const WarehousePage = () => {
  return (
    <></>
  )
}

export default WarehousePage