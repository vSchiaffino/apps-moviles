import React from 'react'
import Table from '@/components/Table/Table'
import BadgeColumn from './BadgeColumn'
import CapacityColumn from './CapacityColumn'

const WarehouseTable: React.FC<{ items: any[] }> = ({ items }) => {
  const [sortState, setSortState] = React.useState<{ column: string; direction: 'ASC' | 'DESC' }>({
    column: 'name',
    direction: 'ASC',
  })
  return (
    <Table
      sortState={sortState}
      onChangeSort={(column, direction) => setSortState({ column, direction })}
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
