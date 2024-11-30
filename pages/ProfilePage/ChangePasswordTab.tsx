import Typography from '@/components/Typography'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import { Spacing } from '@/constants/Spacing'
import userService from '@/services/user.service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { ScrollView } from 'react-native'

const ChangePasswordTab = () => {
  const fields: ValidatedField[] = [
    {
      name: 'actualPassword',
      label: 'Contraseña Actual',
      rules: {
        required: 'La contraseña es requerida',
      },
      component: 'input-password',
    },
    {
      name: 'newPassword',
      label: 'Nueva Contraseña',
      rules: {
        required: 'La contraseña es requerida',
        minLength: {
          value: 8,
          message: 'La contraseña debe tener más de 8 caracteres',
        },
      },
      component: 'input-password',
    },
    {
      name: 'repeatPassword',
      label: 'Repetir contraseña',
      rules: {
        required: 'La contraseña es requerida',
        validate: (value: string, { newPassword }: { newPassword: string }) =>
          value === newPassword || 'Las contraseñas deben coincidir',
      },
      component: 'input-password',
    },
  ]
  const onSubmit = async (form: any) => {
    const jwt = await AsyncStorage.getItem('jwt')
    if (!jwt) throw new Error('Inicia sesión para editar tus datos')
    await userService.changePassword(jwt, {
      password: form.actualPassword,
      newPassword: form.newPassword,
    })
  }
  return (
    <ScrollView
      style={{ height: '100%' }}
      contentContainerStyle={{ padding: 16, gap: Spacing.rowGap }}
    >
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
        onSubmit={onSubmit}
        fields={fields}
        successMessage={'Contraseña cambiada correctamente'}
      />
    </ScrollView>
  )
}

export default ChangePasswordTab
