import React from 'react'
import Table from '@/components/Table/Table'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'

const EgressTable: React.FC<{
  onClickRow: (row: any) => void
  sales: any[]
  total: number
  sort: Sort
  setSort: (sort: Sort) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
  selectedRow?: any
  onLongPressRow: (row: any) => void
}> = ({
  onClickRow,
  sales,
  total,
  sort,
  setSort,
  pagination,
  setPagination,
  selectedRow,
  onLongPressRow,
}) => {
  return (
    sales && (
      <Table
        selectedRow={selectedRow}
        sortingFields={['warehouseName']}
        entityName="Ventas"
        onClickRow={onClickRow}
        onLongPressRow={onLongPressRow}
        sort={sort}
        onChangeSort={setSort}
        headerFont="geist"
        columns={[
          { key: 'warehouseName', title: 'Depósito', width: '40%', align: 'flex-start' },
          { key: 'productName', title: 'Producto', width: '40%', align: 'center' },
          {
            key: 'quantity',
            title: 'stock',
            width: '20%',
            align: 'flex-end',
          },
        ]}
        pagination={{ ...pagination, total }}
        onChangePagination={setPagination}
        rows={sales}
      />
    )
  )
}

export default EgressTable
