import React from 'react'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'
import IconCard from './IconCard'
import { Product } from '@/pages/TransferPage/WarehouseTransferPage'

const WarehouseCard = ({
  warehouseName,
  location,
  capacity,
  productsAmount,
}: {
  warehouseName?: string
  location: string
  capacity: number
  productsAmount: number
}) => {
  return (
    <IconCard
      icon="warehouse"
      color={productsAmount / capacity <= 0.1 ? 'danger' : 'primary'}
      text={warehouseName ? warehouseName : 'Depósito de ' + location}
    />
  )
}

export default WarehouseCard
