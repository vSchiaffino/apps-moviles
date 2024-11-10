import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import MutateEntityModal, { MutateEntityModalProps } from '@/components/MutateEntityModal'
import { Spacing } from '@/constants/Spacing'

export interface WarehouseModalProps
  extends Omit<MutateEntityModalProps, 'children' | 'entityName' | 'isCreating'> {
  onSubmit: (form: any) => Promise<void>
  warehouse?: any
}

const WarehouseModal: React.FC<WarehouseModalProps> = ({ warehouse, onSubmit, ...rest }) => {
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
    {
      name: 'capacity',
      label: 'Capacidad',
      rules: {
        required: 'Este campo es obligatorio',
        valueAsNumber: true,
        min: {
          value: 1,
          message: 'La capacidad debe ser mayor a 0',
        },
      },
      component: 'input',
      inputProps: {
        backgroundColor: 'white',
        keyboardType: 'numeric',
      },
    },
  ]
  const isCreating = warehouse === null
  return (
    <MutateEntityModal isCreating={isCreating} entityName="Depósito" {...rest}>
      <View style={{ flexDirection: 'column', gap: Spacing.rowGap, padding: 20 }}>
        <ValidatedForm
          fields={fields}
          onSubmit={onSubmit}
          submitLabel={isCreating ? 'Crear' : 'Actualizar'}
          formProps={{
            defaultValues: {
              name: warehouse?.name || '',
              capacity: String(warehouse?.capacity || ''),
            },
          }}
        />
      </View>
    </MutateEntityModal>
  )
}

export default WarehouseModal
