import React from 'react'
import Table from '@/components/Table/Table'
import BadgeColumn from './BadgeColumn'
import CapacityColumn from './CapacityColumn'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'

const WarehouseTable: React.FC<{
  onPressRow: (row: any) => void
  onLongPressRow: (row: any) => void
  warehouses: any[]
  total: number
  sort: Sort
  setSort: (sort: Sort) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
}> = ({
  warehouses,
  onPressRow,
  onLongPressRow,
  sort,
  setSort,
  pagination,
  setPagination,
  total,
}) => {
  return (
    warehouses && (
      <Table
        entityName="Depósitos"
        onClickRow={onPressRow}
        onLongPressRow={onLongPressRow}
        sort={sort}
        onChangeSort={setSort}
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
        pagination={{ ...pagination, total }}
        onChangePagination={setPagination}
        rows={warehouses.map((warehouse) => ({
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
  )
}

export default WarehouseTable
