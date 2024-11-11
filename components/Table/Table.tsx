import { DimensionValue, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { Fonts } from '../Typography'
import { TablePagination } from './TablePagination'
import Sort from '@/models/Sort'
import Pagination from '@/models/Pagination'

export interface TableColumn {
  key: string
  title: string
  align?: 'flex-start' | 'center' | 'flex-end'
  font?: Fonts
  render?: (row: any) => React.ReactNode
  component?: React.FC<{ row: any }>
  getValue?: (row: any) => any
  width: DimensionValue
}

//TODO use pagination and sort model
export interface TableProps {
  columns: TableColumn[]
  rows: any[]
  headerFont?: Fonts
  sort?: Sort
  onChangeSort?: (sort: Sort) => void
  pagination?: { page: number; limit: number; total: number }
  onChangePagination?: (pagination: Pagination) => void
  entityName?: string
  onClickRow?: (row: any) => void
  onLongPressRow?: (row: any) => void
}

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  headerFont,
  sort,
  onChangeSort,
  pagination,
  onChangePagination,
  onClickRow = () => {},
  onLongPressRow = () => {},
  entityName = 'items',
}) => {
  return (
    <View>
      <View
        style={{
          borderColor: Colors.gray[200],
          borderWidth: 1,
          borderRadius: 16,
          marginBottom: 10,
        }}
      >
        <TableHeader
          columns={columns}
          headerFont={headerFont}
          sort={sort}
          onChangeSort={onChangeSort}
        />
        <TableBody
          columns={columns}
          rows={rows}
          onClickRow={onClickRow}
          onLongPressRow={onLongPressRow}
        />
      </View>
      {pagination && onChangePagination && (
        <TablePagination
          entityName={entityName}
          pagination={{
            actual: rows.length,
            ...pagination,
          }}
          onChangePagination={onChangePagination}
        />
      )}
    </View>
  )
}

export default Table
