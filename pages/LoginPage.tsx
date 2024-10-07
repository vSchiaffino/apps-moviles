import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Typography from '@/components/Typography'
import ValidatedForm from '@/components/ValidatedForm'
import userService from '@/services/user.service'

const LoginPage = () => {
  const onSubmit = async (form: any) => {
    const response = await userService.login(form.user, form.password)
    // TODO handle correct login  properly
    console.log(response)
  }
  const fields = [
    {
      name: 'user',
      label: 'Usuario',
      rules: {
        required: 'El usuario es requerido',
      },
    },
    {
      name: 'password',
      label: 'Contraseña',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
      },
    },
  ]
  return (
    <View style={styles.container}>
      <Typography variant='h3'>Iniciá sesión</Typography>
      <ValidatedForm
        fields={fields}
        onSubmit={onSubmit}
        formProps={{
          defaultValues: {
            user: '',
            password: '',
          },
        }}
      />
      <Typography variant='subtitle' color='dark'>
        ¿No tenés cuenta? <Link href='../register'>Crear usuario</Link>
      </Typography>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 'auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 30,
  },
})
