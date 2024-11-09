import { View } from 'react-native'
import React from 'react'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import MutateEntityModal, { MutateEntityModalProps } from '@/components/MutateEntityModal'
import { Spacing } from '@/constants/Spacing'

export interface WarehouseModalProps extends MutateEntityModalProps {
  onSubmit: (form: any) => Promise<void>
}

const WarehouseModal: React.FC<WarehouseModalProps> = ({ onSubmit, ...rest }) => {
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
  return (
    <MutateEntityModal {...rest}>
      <View style={{ flexDirection: 'column', gap: Spacing.rowGap, padding: 20 }}>
        <ValidatedForm
          fields={fields}
          onSubmit={onSubmit}
          submitLabel="Crear"
          formProps={{
            defaultValues: {
              name: '',
              capacity: '',
            },
          }}
        />
      </View>
    </MutateEntityModal>
  )
}

export default WarehouseModal
