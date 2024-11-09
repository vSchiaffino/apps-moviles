import { DimensionValue, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { Fonts } from '../Typography'

export interface TableColumn {
  key: string
  title: string
  align?: 'flex-start' | 'center' | 'flex-end'
  font?: Fonts
  render?: (row: any) => React.ReactNode
  component?: React.FC<{ row: any }>
  width: DimensionValue
}

export interface TableProps {
  columns: TableColumn[]
  rows: any[]
  headerFont?: Fonts
}

const Table: React.FC<TableProps> = ({ columns, rows, headerFont }) => {
  return (
    <View style={{ borderColor: Colors.gray[200], borderWidth: 1, borderRadius: 16 }}>
      <TableHeader columns={columns} headerFont={headerFont} />
      <TableBody columns={columns} rows={rows} />
    </View>
  )
}

export default Table
