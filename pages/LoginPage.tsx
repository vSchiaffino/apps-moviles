import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Typography from '@/components/Typography'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import userService from '@/services/user.service'
import { UserPayload } from '@/context/AuthContext'
import useUser from '@/hooks/useUser'

const LoginPage = () => {
  const { user, setUser } = useUser()
  const onSubmit = async (form: any) => {
    const response = await userService.login(form.user, form.password)
    const json = await response.json()
    const jwtToken = json.token
    const payloadBase64 = jwtToken.split('.')[1]
    const payload: UserPayload = JSON.parse(atob(payloadBase64))
    setUser(payload)
    router.push('/')
  }
  const fields: ValidatedField[] = [
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
      rules: {
        required: 'La contraseña es requerida',
      },
      inputProps: {
        secureTextEntry: true,
      },
    },
  ]
  return (
    <View style={styles.container}>
      <Typography variant="h3">Iniciá sesión</Typography>
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
      <Typography variant="subtitle" color="dark">
        ¿No tenés cuenta? <Link href="../register">Crear usuario</Link>
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
