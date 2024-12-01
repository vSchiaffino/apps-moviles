import React from 'react'
import Table from '@/components/Table/Table'
import { Egress } from '@/models/shift'

export interface EgressTableProps {
  egresses: Egress[]
}

const EgressTable: React.FC<EgressTableProps> = ({ egresses }) => {
  return (
    egresses && (
      <Table
        entityName="Egresos"
        headerFont="geist"
        columns={[
          {
            key: 'warehouse',
            title: 'Depósito',
            width: '30%',
            align: 'flex-start',
            getValue: (row) => row.warehouse.name,
          },
          {
            key: 'product',
            title: 'Producto',
            width: '40%',
            align: 'center',
            getValue: (row) => row.product.name,
          },
          {
            key: 'quantity',
            title: 'cantidad',
            width: '30%',
            align: 'flex-end',
          },
        ]}
        rows={egresses}
      />
    )
  )
}

export default EgressTable
