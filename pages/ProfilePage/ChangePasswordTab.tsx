import Typography from '@/components/Typography'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import React from 'react'

const ChangePasswordTab = () => {
  const fields: ValidatedField[] = [
    {
      name: 'actualPassword',
      label: 'Contraseña Actual',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
        minLength: {
          value: 8,
          message: 'La contraseña no coincide con la contraseña actual',
        },
      },
    },
    {
      name: 'newPassword',
      label: 'Nueva Contraseña',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
        minLength: {
          value: 8,
          message: 'La contraseña debe tener más de 8 caracteres',
        },
      },
    },
    {
      name: 'repeatPassword',
      label: 'Repetir contraseña',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
        validate: (value: string, { password }: { password: string }) =>
          value === password || 'Las contraseñas deben coincidir',
      },
    },
  ]
  const onSubmit = async () => {
    // TODO: Handle onSubmit change user
  }
  return (
    <>
      <Typography variant="h6" color="gray">
        Contraseña
      </Typography>
      <ValidatedForm
        formProps={{
          defaultValues: {
            actualPassword: '',
            newPassword: '',
            repeatPassword: '',
          },
        }}
        submitLabel="Cambiar Contraseña"
        onSubmit={() => onSubmit()}
        fields={fields}
      />
    </>
  )
}

export default ChangePasswordTab
