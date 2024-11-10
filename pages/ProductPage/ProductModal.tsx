import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import MutateEntityModal, { MutateEntityModalProps } from '@/components/MutateEntityModal'
import { Spacing } from '@/constants/Spacing'

export interface WarehouseModalProps
  extends Omit<MutateEntityModalProps, 'children' | 'entityName' | 'isCreating'> {
  onSubmit: (form: any) => Promise<void>
  product?: any
}

const ProductModal: React.FC<WarehouseModalProps> = ({ product, onSubmit, ...rest }) => {
  const fields: ValidatedField[] = [
    {
      name: 'name',
      label: 'Nombre',
      component: 'input',
      rules: {
        required: 'Este campo es obligatorio',
      },
      inputProps: {
        backgroundColor: 'white',
      },
    },
  ]
  const isCreating = product === null
  return (
    <MutateEntityModal isCreating={isCreating} entityName="Producto" {...rest}>
      <View style={{ flexDirection: 'column', gap: Spacing.rowGap, padding: 20 }}>
        <ValidatedForm
          fields={fields}
          onSubmit={onSubmit}
          submitLabel={isCreating ? 'Crear' : 'Actualizar'}
          formProps={{
            defaultValues: {
              name: product?.name || '',
            },
          }}
        />
      </View>
    </MutateEntityModal>
  )
}

export default ProductModal
