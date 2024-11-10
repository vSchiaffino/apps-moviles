import React from 'react'
import Table from '@/components/Table/Table'
import BadgeColumn from './BadgeColumn'
import CapacityColumn from './CapacityColumn'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'

const WarehouseTable: React.FC<{ items: any[]; onClickRow: (row: any) => void }> = ({
  items,
  onClickRow,
}) => {
  const [pagination, setPagination] = React.useState<Pagination>({ page: 1, limit: 5 })
  const [sortState, setSortState] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  return (
    <Table
      entityName="Depósitos"
      onClickRow={onClickRow}
      sort={sortState}
      onChangeSort={setSortState}
      headerFont="geist"
      columns={[
        { key: 'name', title: 'Nombre', width: '33.3%', align: 'flex-start' },
        {
          key: 'badge',
          title: 'Estado',
          width: '33.3%',
          align: 'center',
          component: BadgeColumn,
        },
        {
          key: 'stock',
          title: 'Capacidad',
          width: '33.3%',
          align: 'flex-end',
          component: CapacityColumn,
        },
      ]}
      pagination={{ ...pagination, total: items.length }}
      onChangePagination={setPagination}
      rows={items.map((warehouse) => ({
        ...warehouse,
        state:
          warehouse.stock / warehouse.capacity >= 1
            ? 'full'
            : warehouse.stock / warehouse.capacity >= 0.9
              ? 'almostFull'
              : 'ok',
      }))}
    />
  )
}

export default WarehouseTable
