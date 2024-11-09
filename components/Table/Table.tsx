import { DimensionValue, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'

export interface TableColumn {
  key: string
  title: string
  align?: 'flex-start' | 'center' | 'flex-end'
  render?: (row: any) => React.ReactNode
  width: DimensionValue
}

export interface TableProps {
  columns: TableColumn[]
  rows: any[]
}

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  return (
    <View style={{ borderColor: Colors.gray[200], borderWidth: 1 }}>
      <TableHeader columns={columns} />
      <TableBody columns={columns} rows={rows} />
    </View>
  )
}

export default Table
