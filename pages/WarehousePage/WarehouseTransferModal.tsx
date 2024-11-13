import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import MutateEntityModal, { MutateEntityModalProps } from '@/components/MutateEntityModal'
import { Spacing } from '@/constants/Spacing'
import { useWarehouses } from '@/hooks/useWarehouses'
import useProducts from '@/hooks/useProducts'
import Sort from '@/models/Sort'

export interface TransferWarehouseModalProps
  extends Omit<MutateEntityModalProps, 'children' | 'entityName' | 'isCreating'> {
  onSubmit: (form: any) => Promise<void>
}

const TransferWarehouseModal: React.FC<TransferWarehouseModalProps> = ({ onSubmit, ...rest }) => {
  const defaultPagination = { page: 1, limit: 999 }
  const defaultSort: Sort = { field: 'name', direction: 'ASC' }
  const [origin, setOrigin] = useState<any>(null)
  const { products } = useProducts(defaultPagination, defaultSort)
  const { warehouses } = useWarehouses(defaultPagination, defaultSort)
  console.log(origin ? origin.stock.map((stock: any) => stock.product) : products)
  const fields: ValidatedField[] = [
    {
      name: 'origin',
      label: 'Deposito de origen',
      component: 'select',
      rules: {
        required: 'Este campo es obligatorio',
      },
      inputProps: {
        backgroundColor: 'white',
        options: warehouses,
        renderOption: (option: any) => option.name,
        optionsYOffset: 38,
      },
    },
    {
      name: 'product',
      label: 'Producto',
      rules: {
        required: 'Este campo es obligatorio',
      },
      component: 'select',
      inputProps: {
        backgroundColor: 'white',
        // TODO: show only products in the origin warehouse
        options: origin ? origin.stock.map((stock: any) => stock.product) : products,
        renderOption: (option: any) => option.name,
        optionsYOffset: 38,
      },
    },
    {
      name: 'quantity',
      label: 'Cantidad',
      rules: {
        required: 'Este campo es obligatorio',
        min: {
          value: 1,
          message: 'La cantidad debe ser mayor a 0',
        },
      },
      component: 'input',
      inputProps: {
        backgroundColor: 'white',
      },
    },
    {
      name: 'destination',
      label: 'Deposito destino',
      rules: {
        required: 'Este campo es obligatorio',
      },
      component: 'select',
      inputProps: {
        backgroundColor: 'white',
        options: warehouses,
        optionsYOffset: 38,
        // TODO: filter only warehouses with capacity and different from origin
        renderOption: (option: any) => option.name,
      },
    },
  ]
  return (
    <MutateEntityModal title="Transferencia" {...rest}>
      <View style={{ flexDirection: 'column', gap: Spacing.rowGap, padding: 20 }}>
        <ValidatedForm
          fields={fields}
          onSubmit={onSubmit}
          submitLabel={'Transferir'}
          onFormChange={(name, value) => {
            console.log('onFormChange', name, value)
            if (name === 'origin') setOrigin(value)
          }}
        />
      </View>
    </MutateEntityModal>
  )
}

export default TransferWarehouseModal
