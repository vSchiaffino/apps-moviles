import React from 'react'
import Table from '@/components/Table/Table'

const ProductTable: React.FC<{ items: any[]; onClickRow: (row: any) => void }> = ({
  items,
  onClickRow,
}) => {
  const [pagination, setPagination] = React.useState({ page: 1, perPage: 5, total: items.length })
  const [sortState, setSortState] = React.useState<{ column: string; direction: 'ASC' | 'DESC' }>({
    column: 'name',
    direction: 'ASC',
  })
  return (
    <Table
      entityName="Productos"
      onClickRow={onClickRow}
      sort={sortState}
      onChangeSort={(column, direction) => setSortState({ column, direction })}
      headerFont="geist"
      columns={[
        { key: 'name', title: 'Nombre', width: '75%', align: 'flex-start' },
        {
          key: 'stock',
          title: 'Stock',
          width: '50%',
          align: 'flex-start',
        },
      ]}
      pagination={pagination}
      onChangePage={(page) => setPagination({ ...pagination, page })}
      onChangePerPage={(perPage) => setPagination({ ...pagination, perPage })}
      rows={items}
    />
  )
}

export default ProductTable
