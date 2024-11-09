import React from 'react'
import { View } from 'react-native'
import { TableColumn } from './Table'
import { Colors } from '@/constants/Colors'
import Typography from '../Typography'
import Card from '../Card'

export const TableBody: React.FC<{ columns: TableColumn[]; rows: any[] }> = ({ columns, rows }) => {
  const colorPallete = Colors['gray']
  return rows.map((row, index) => (
    <Card
      key={index}
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
        borderRadius: 0,
        borderBottomWidth: index === rows.length - 1 ? 0 : 1,
        borderColor: Colors.gray[200],
      }}
    >
      {columns.map(({ key, width, align, font, render }) => (
        <View
          style={{
            width,
            justifyContent: 'center',
            alignItems: align,
          }}
        >
          {render ? (
            render(row)
          ) : (
            <Typography
              justify={
                align && (align === 'flex-start' ? 'left' : align === 'center' ? 'center' : 'right')
              }
              font={font}
              key={key}
              variant="body"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ width: '100%' }}
            >
              {row[key]}
            </Typography>
          )}
        </View>
      ))}
    </Card>
  ))
  // <WarehouseCardList
  //   capacity={row.capacity}
  //   location={row.location}
  //   productsAmount={row.productsAmount}
  //   warehouseName={row.warehouseName}
  //   key={index}
  // />
}
