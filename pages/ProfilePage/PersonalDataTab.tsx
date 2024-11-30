import Typography from '@/components/Typography'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import { Spacing } from '@/constants/Spacing'
import { useAuthorizedUser } from '@/hooks/useUser'
import React from 'react'
import { ScrollView } from 'react-native'

const PersonalDataTab = () => {
  const { user, editUser } = useAuthorizedUser()
  const onSubmit = async (form: any) => {
    await editUser(form)
  }

  const fields: ValidatedField[] = [
    {
      name: 'name',
      label: 'Nombre',
      rules: { required: 'El nombre es requerido' },
    },
    {
      name: 'lastName',
      label: 'Apellido',
      rules: { required: 'El apellido es requerido' },
    },
    {
      name: 'user',
      label: 'Usuario',
      disabled: true,
      rules: {
        required: 'El usuario es requerido',
        minLength: {
          value: 4,
          message: 'El usuario debe tener más de 4 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El usuario debe tener menos de 20 caracteres',
        },
      },
    },
    {
      name: 'mail',
      label: 'Mail',
      disabled: true,
      rules: {
        required: 'El mail es requerido',
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          message: 'El mail es inválido',
        },
      },
    },
  ]
  return (
    <ScrollView
      style={{ height: '100%' }}
      contentContainerStyle={{ padding: 16, gap: Spacing.rowGap + 10 }}
    >
      <Typography variant="h6" color="gray">
        Datos Personales
      </Typography>
      <ValidatedForm
        formProps={{ defaultValues: user }}
        submitLabel="Guardar"
        onSubmit={onSubmit}
        fields={fields}
        successMessage="Usuario actualizado correctamente"
      />
    </ScrollView>
  )
}

export default PersonalDataTab
