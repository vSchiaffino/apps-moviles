import { StyleSheet, View } from 'react-native'
import React from 'react'
import Typography from '@/components/Typography'
import { Link, router } from 'expo-router'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import userService from '@/services/user.service'

const RegisterPage = () => {
  const onSubmit = async (form: any) => {
    const response = await userService.register(form)
    // TODO: show success message
    router.push('/login')
  }
  const fields: ValidatedField[] = [
    {
      name: 'user',
      label: 'Usuario',
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
      name: 'mail',
      label: 'Mail',
      rules: {
        required: 'El mail es requerido',
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          message: 'El mail es inválido',
        },
      },
    },
    {
      name: 'password',
      label: 'Contraseña',
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
  return (
    <View style={styles.container}>
      <Typography variant='h3'>Registrate</Typography>
      <ValidatedForm
        formProps={{
          defaultValues: {
            user: '',
            name: '',
            lastName: '',
            mail: '',
            password: '',
            repeatPassword: '',
          },
        }}
        submitLabel='Registrarse'
        onSubmit={onSubmit}
        fields={fields}
      />
      <Typography variant='subtitle' color='dark'>
        ¿Ya tenés cuenta? <Link href='../login'>Ingresar</Link>
      </Typography>
    </View>
  )
}

export default RegisterPage

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 'auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 20,
  },
})
