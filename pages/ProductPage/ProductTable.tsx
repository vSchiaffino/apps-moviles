import React from 'react'
import Table from '@/components/Table/Table'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'

const ProductTable: React.FC<{
  onClickRow: (row: any) => void
  products: any[]
  total: number
  sort: Sort
  setSort: (sort: Sort) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
}> = ({ onClickRow, products, total, sort, setSort, pagination, setPagination }) => {
  return (
    products && (
      <Table
        sortingFields={['name']}
        entityName="Productos"
        onClickRow={onClickRow}
        sort={sort}
        onChangeSort={setSort}
        headerFont="geist"
        columns={[
          { key: 'name', title: 'Nombre', width: '75%', align: 'flex-start' },
          {
            key: 'stock',
            title: 'Stock',
            width: '25%',
            align: 'center',
          },
        ]}
        pagination={{ ...pagination, total }}
        onChangePagination={setPagination}
        rows={products}
      />
    )
  )
}

export default ProductTable
