import React from 'react'
import { TableColumn } from './Table'
import { Colors } from '@/constants/Colors'
import Card from '../Card'
import TableItem from './TableItem'
import { View } from 'react-native'

export interface TableBodyProps {
  columns: TableColumn[]
  rows: any[]
  component?: React.FC<{ row: any }>
  render?: (row: any) => React.ReactNode
  onClickRow: (row: any) => void
}

export const TableBody: React.FC<TableBodyProps> = ({ columns, rows, onClickRow }) => {
  const colorPallete = Colors['gray']
  return rows.map((row, index) => (
    <Card
      key={index}
      pressable
      onPress={() => onClickRow(row)}
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
      {columns.map((column) => (
        <View
          key={column.key}
          style={{
            width: column.width,
            justifyContent: 'center',
            alignItems: column.align,
          }}
        >
          <TableItem column={column} row={row} />
        </View>
      ))}
    </Card>
  ))
}
