import MutateEntityModal from '@/components/MutateEntityModal'
import ValidatedForm from '@/components/ValidatedForm'
import { Spacing } from '@/constants/Spacing'
import React from 'react'
import { View } from 'react-native'

export interface SetEgressModalProps {
  show: boolean
  setShow: (show: boolean) => void
  onSubmit: (form: any) => Promise<void>
  products: any[]
  selectedProduct?: any
}

export const SetEgressModal: React.FC<SetEgressModalProps> = ({
  show,
  setShow,
  onSubmit,
  products,
  selectedProduct,
}) => {
  return (
    <MutateEntityModal title="Registrar egreso" show={show} setShow={setShow}>
      <View style={{ padding: Spacing.rowGap, rowGap: Spacing.rowGap }}>
        <ValidatedForm
          formProps={{
            defaultValues: {
              product: selectedProduct,
              quantity: '',
            },
          }}
          onSubmit={onSubmit}
          fields={[
            {
              label: 'Producto',
              name: 'product',
              component: 'select',
              disabled: true,
              inputProps: {
                backgroundColor: 'white',
                options: products,
                renderOption: (option) => option.name,
                label: 'Producto',
                optionsYOffset: 38,
              },
              rules: {
                required: 'Este campo es requerido',
              },
            },
            {
              label: 'Cantidad',
              name: 'quantity',
              component: 'input',
              inputProps: {
                backgroundColor: 'white',
                keyboardType: 'numeric',
              },
              rules: {
                required: 'Este campo es requerido',
              },
            },
          ]}
        />
      </View>
    </MutateEntityModal>
  )
}
