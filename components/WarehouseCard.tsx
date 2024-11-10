import React from 'react'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'
import { View } from 'react-native'
import * as Progress from 'react-native-progress'
import Card from './Card'
import { FontAwesome6 } from '@expo/vector-icons'

const WarehouseCard: React.FC<{ item: any }> = ({ item: { name, stock, capacity } }) => {
  const full = stock / capacity >= 1
  const almostFull = stock / capacity >= 0.9 && !full
  const color = full ? 'danger' : almostFull ? 'yellow' : 'primary'
  const colorPallete = Colors[color]

  return (
    <Card
      pressable
      style={{
        flex: 1,
        aspectRatio: 4 / 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPallete[200],
        gap: 5,
      }}
    >
      <FontAwesome6
        name={'warehouse'}
        size={32}
        color={colorPallete[600]}
        style={{
          backgroundColor: colorPallete[300],
          borderRadius: 24,
          padding: 16,
        }}
      />
      <Typography
        variant="h5"
        color={color}
        numberOfLines={1}
        ellipsizeMode="tail"
        justify="center"
        style={{ width: '70%' }}
      >
        {name}
      </Typography>

      <View style={{ width: '50%', alignItems: 'center', gap: 5, marginTop: 10 }}>
        <Typography variant="h6" color={color}>
          {stock}
          <Typography variant="mini" color={color}>
            {' /'}
            {capacity}
          </Typography>
        </Typography>

        <Progress.Bar
          progress={stock / capacity}
          borderColor={colorPallete[500]}
          unfilledColor={colorPallete[300]}
          color={colorPallete[500]}
        />
      </View>
    </Card>
  )
}

export default WarehouseCard
