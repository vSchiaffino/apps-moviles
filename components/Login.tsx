import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import OutlinedInput from './OutlinedInput'
import StyledButton from './StyledButton'
import Typography from './Typography'

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View
      style={{
        marginHorizontal: 'auto',
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        gap: 30,
      }}
    >
      <Typography variant='h3'>Login</Typography>
      <OutlinedInput label='Usuario' value={user} onChangeText={setUser} />
      <OutlinedInput
        label='Contraseña'
        value={password}
        onChangeText={setPassword}
      />
      <StyledButton label='Entrar' />
      <Typography variant='subtitle' color='primary'>
        <Link href='../register'>¿No tenés cuenta? Crear usuario</Link>
      </Typography>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})
