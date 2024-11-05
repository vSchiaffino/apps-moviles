import React from 'react'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'
import { View } from 'react-native'
import * as Progress from 'react-native-progress'
import Card from './Card'

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
  const color = productsAmount / capacity >= 0.9 ? 'danger' : 'primary'
  const colorPallete = Colors[color]
  return (
    <Card
      pressable
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        aspectRatio: 25 / 4,
        backgroundColor: colorPallete[200],
        padding: 10,
      }}
    >
      <Typography
        variant="h6"
        color={color}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ width: '50%' }}
      >
        {warehouseName !== undefined ? warehouseName : 'Depósito de ' + location}
      </Typography>

      <View style={{ width: '30%' }}>
        <Typography variant="body" color={color} justify="right">
          {productsAmount}
          <Typography variant="mini" color={color}>
            {' /'}
            {capacity}
          </Typography>
        </Typography>

        <Progress.Bar
          progress={productsAmount / capacity}
          borderColor={colorPallete[500]}
          unfilledColor={colorPallete[300]}
          color={colorPallete[500]}
          style={{ marginBottom: 20, width: null, height: null }}
        />
      </View>
    </Card>
  )
}

export default WarehouseCard
