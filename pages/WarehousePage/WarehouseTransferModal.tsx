import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import MutateEntityModal, { MutateEntityModalProps } from '@/components/MutateEntityModal'
import { Spacing } from '@/constants/Spacing'
import { useWarehouses } from '@/hooks/useWarehouses'
import useProducts from '@/hooks/useProducts'
import Sort from '@/models/Sort'
import { useForm } from 'react-hook-form'

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
        options: origin ? origin.stock.map((stock: any) => stock.product) : products,
        renderOption: (option: any) => option.name,
        optionsYOffset: 38,
        disabled: !origin,
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
        disabled: !origin,
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
        options: warehouses?.filter((warehouse: any) => warehouse.id !== origin?.id),
        optionsYOffset: 38,
        renderOption: (option: any) => option.name,
        disabled: !origin,
      },
    },
  ]
  return (
    <MutateEntityModal title="Transferencia" {...rest}>
      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        <View style={{ flexDirection: 'column', gap: Spacing.rowGap, padding: 16 }}>
          <ValidatedForm
            fields={fields}
            onSubmit={onSubmit}
            submitLabel={'Transferir'}
            onFormChange={(name, value) => {
              if (name === 'origin') setOrigin(value)
            }}
          />
        </View>
      </ScrollView>
    </MutateEntityModal>
  )
}

export default TransferWarehouseModal
