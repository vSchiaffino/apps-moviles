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
      <Text style={{ fontSize: 32, fontFamily: 'Poppins' }}>Login</Text>

      <OutlinedInput label='Usuario' value={user} onChangeText={setUser} />
      <OutlinedInput
        label='Contraseña'
        value={password}
        onChangeText={setPassword}
      />
      <StyledButton label='Entrar' />
      <Text>
        ¿No tenés cuenta? <Link href='../register'>Crear usuario</Link>
      </Text>
      {/* <Button title='Entrar' /> */}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})
