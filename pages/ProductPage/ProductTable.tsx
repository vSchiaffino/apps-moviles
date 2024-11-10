import React from 'react'
import Table from '@/components/Table/Table'
import useProducts from '@/hooks/useProducts'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'

const ProductTable: React.FC<{ onClickRow: (row: any) => void }> = ({ onClickRow }) => {
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    limit: 5,
  })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { products, total } = useProducts(pagination, sort)
  return (
    products && (
      <Table
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
