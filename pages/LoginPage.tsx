import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Typography from '@/components/Typography'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import userService from '@/services/user.service'
import { useNotAuthorizedUser } from '@/hooks/useUser'
import { Spacing } from '@/constants/Spacing'
import { Colors } from '../constants/Colors'
import { Buffer } from 'buffer'
import { UserPayload } from '@/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginPage = () => {
  const setUser = useNotAuthorizedUser()
  const onSubmit = async (form: any) => {
    const response = await userService.login(form.user, form.password)
    const json = await response.json()
    const jwtToken = json.token
    const parts = jwtToken
      .split('.')
      .map((part: string) =>
        Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString(),
      )
    const payload: UserPayload = JSON.parse(parts[1])
    setUser(payload)
    await AsyncStorage.clear()
    await AsyncStorage.setItem('user', JSON.stringify(payload))
    await AsyncStorage.setItem('jwt', jwtToken)

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
      component: 'input-password',
      rules: {
        required: 'La contraseña es requerida',
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
    backgroundColor: Colors.gray[100],
    marginHorizontal: 'auto',
    paddingHorizontal: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: Spacing.rowGap,
  },
})
