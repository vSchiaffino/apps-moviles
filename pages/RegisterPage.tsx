import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import OutlinedInput from '@/components/OutlinedInput'
import StyledButton from '@/components/StyledButton'
import Typography from '@/components/Typography'

const RegisterPage = () => {
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  return (
    <View style={styles.container}>
      <Typography variant='h3'>Registrate</Typography>
      <OutlinedInput label='Usuario' value={user} onChangeText={setUser} />
      <OutlinedInput label='Nombre' value={name} onChangeText={setName} />
      <OutlinedInput
        label='Apellido'
        value={lastname}
        onChangeText={setLastname}
      />
      <OutlinedInput label='Email' value={email} onChangeText={setEmail} />
      <OutlinedInput
        label='Contraseña'
        value={password}
        onChangeText={setPassword}
      />
      <OutlinedInput
        label='Repetir contraseña'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <StyledButton label='Entrar' />
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
