import React from 'react'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'
import { View } from 'react-native'
import * as Progress from 'react-native-progress'
import Card from './Card'

const WarehouseCard = ({
  last,
  warehouseName,
  location,
  capacity,
  productsAmount,
}: {
  last: boolean
  warehouseName?: string
  location: string
  capacity: number
  productsAmount: number
}) => {
  const color = 'gray'
  const colorPallete = Colors[color]
  const full = productsAmount / capacity >= 1
  const almostFull = productsAmount / capacity >= 0.9 && !full
  return (
    <>
      <Card
        pressable
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          aspectRatio: 25 / 4,
          minHeight: 'auto',
          backgroundColor: colorPallete[100],
          padding: 10,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: !last ? 0 : 5,
          borderBottomRightRadius: !last ? 0 : 5,
          borderTopWidth: 0.5,
          borderColor: Colors.gray[400],
        }}
      >
        <Typography
          variant="body"
          color={color}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ width: '33%', alignSelf: 'center' }}
        >
          {warehouseName !== undefined ? warehouseName : 'Depósito de ' + location}
        </Typography>

        <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="mini"
            justify="center"
            style={{
              backgroundColor: full
                ? Colors.danger[100]
                : almostFull
                  ? Colors.yellow[100]
                  : Colors.primary[200],
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 16,
              width: 45,
              color: full
                ? Colors.danger[600]
                : almostFull
                  ? Colors.yellow[600]
                  : Colors.primary[600],
            }}
          >
            {full ? 'FULL' : almostFull ? 'AF' : 'OK'}
          </Typography>
        </View>

        <View
          style={{
            width: '33%',
            maxHeight: 'auto',
            alignItems: 'flex-end',
          }}
        >
          <Typography
            variant="body"
            style={{
              color: full
                ? Colors.danger[600]
                : almostFull
                  ? Colors.yellow[600]
                  : Colors.primary[600],
            }}
          >
            {productsAmount}
            <Typography
              variant="mini"
              style={{
                color: full
                  ? Colors.danger[600]
                  : almostFull
                    ? Colors.yellow[600]
                    : Colors.primary[600],
              }}
            >
              {'/'}
              {capacity}
            </Typography>
          </Typography>

          {/* <Progress.Bar
            progress={productsAmount / capacity}
            borderColor={colorPallete[500]}
            unfilledColor={colorPallete[300]}
            color={colorPallete[500]}
            width={null}
            style={{ width: '100%' }}
          /> */}
        </View>
      </Card>
    </>
  )
}

export default WarehouseCard
