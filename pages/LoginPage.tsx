import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import OutlinedInput from '@/components/OutlinedInput'
import StyledButton from '@/components/StyledButton'
import Typography from '@/components/Typography'

const LoginPage = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <Typography variant='h3'>Iniciá sesión</Typography>

      <OutlinedInput 
        label='Usuario' 
        value={user} 
        onChangeText={setUser} />
      
      <OutlinedInput
        label='Contraseña'
        value={password}
        onChangeText={setPassword}
      />
      
      <StyledButton label='Entrar' />
      
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
