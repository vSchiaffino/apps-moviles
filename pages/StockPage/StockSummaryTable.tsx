import { View, Text } from 'react-native'
import React from 'react'
import Table from '@/components/Table/Table'

const StockSummaryTable = ({
  rows,
  onClickRow,
}: {
  rows: any[]
  onClickRow: (row: any, index?: number) => void
}) => {
  return (
    rows && (
      <Table
        sortingFields={[]}
        headerFont="geist"
        entityName="Productos"
        onClickRow={onClickRow}
        columns={[
          {
            key: 'product',
            title: 'Producto',
            width: '40%',
            align: 'flex-start',
            getValue: (row) => row.product.name,
          },
          { key: 'initialStock', title: 'Stock inicial', width: '30%', align: 'center' },
          { key: 'finalStock', title: 'Stock final', width: '30%', align: 'center' },
        ]}
        rows={rows.sort((a, b) => a.product.name.localeCompare(b.product.name))}
      />
    )
  )
}

export default StockSummaryTable
