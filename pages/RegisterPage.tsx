import { StyleSheet, View } from 'react-native'
import React from 'react'
import Typography from '@/components/Typography'
import { Link, router } from 'expo-router'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import userService from '@/services/user.service'
import { Spacing } from '@/constants/Spacing'
import { Colors } from '@/constants/Colors'
import { Buffer } from 'buffer'
import { useNotAuthorizedUser } from '@/hooks/useUser'
import { UserPayload } from '@/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RegisterPage = () => {
  const setUser = useNotAuthorizedUser()
  const onSubmit = async (form: any) => {
    const response = await userService.register(form)
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
      inputProps: {
        autoCapitalize: 'words',
      },
    },
    {
      name: 'lastName',
      label: 'Apellido',
      rules: { required: 'El apellido es requerido' },
      inputProps: {
        autoCapitalize: 'words',
      },
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
      component: 'input-password',
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
      component: 'input-password',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
        validate: (value: string, { password }: { password: string }) =>
          value === password || 'Las contraseñas deben coincidir',
      },
      inputProps: {
        secureTextEntry: true,
      },
    },
  ]
  return (
    <View style={styles.container}>
      <Typography variant="h3">Registrate</Typography>
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
        submitLabel="Registrarse"
        onSubmit={onSubmit}
        fields={fields}
      />
      <Typography variant="subtitle" color="dark">
        ¿Ya tenés cuenta? <Link href="../login">Ingresar</Link>
      </Typography>
    </View>
  )
}

export default RegisterPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray[100],
    marginHorizontal: 'auto',
    width: '100%',
    padding: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: Spacing.rowGap,
  },
})
