import { DimensionValue, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { Fonts } from '../Typography'
import { TablePagination } from './TablePagination'

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
  sort?: { column: string; direction: 'ASC' | 'DESC' }
  onChangeSort?: (column: string, direction: 'ASC' | 'DESC') => void
  pagination: { page: number; perPage: number; total: number }
  onChangePage: (page: number) => void
  onChangePerPage: (perPage: number) => void
  entityName?: string
  onClickRow?: (row: any) => void
}

const Table: React.FC<TableProps> = ({
  columns,
  rows,
  headerFont,
  sort,
  onChangeSort,
  pagination,
  onChangePage,
  onChangePerPage,
  onClickRow = () => {},
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
        <TableBody columns={columns} rows={rows} onClickRow={onClickRow} />
      </View>
      <TablePagination
        entityName={entityName}
        pagination={{
          ...pagination,
          actual: rows.length,
        }}
        onChangePage={onChangePage}
        onChangePerPage={onChangePerPage}
      />
    </View>
  )
}

export default Table
