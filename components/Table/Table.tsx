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
  onClickRow?: (row: any, index?: number) => void
  onLongPressRow?: (row: any) => void
  sortingFields?: string[]
  rounded?: boolean
  selectedRow?: any
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
  sortingFields = [],
  rounded = false,
  selectedRow,
}) => {
  return (
    <View style={{ gap: 10 }}>
      <View>
        <TableHeader
          rounded={rounded}
          columns={columns}
          headerFont={headerFont}
          sort={sort}
          onChangeSort={onChangeSort}
          sortingFields={sortingFields}
        />
        <TableBody
          selectedRow={selectedRow}
          rounded={rounded}
          columns={columns}
          rows={rows}
          onClickRow={onClickRow}
          onLongPressRow={onLongPressRow}
        />
      </View>
      <View>
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
    </View>
  )
}

export default Table
