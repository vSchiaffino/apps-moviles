import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import OutlinedInput from '@/components/OutlinedInput'
import StyledButton from '@/components/StyledButton'
import Typography from '@/components/Typography'
import { Link } from 'expo-router'

const RegisterPage = () => {
  const checkEmail = (email : string) => {
    const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
    return !regexp.test(email) ? 'El mail es inválido' : ''
  }
  
  const onSubmit = () => {
    setUserError(
      user.length > 20 || user.length < 4 ? 'El usuario debe tener entre 4 y 20 caracteres' : ''
    )
    setPasswordError(password !== confirmPassword ? 'Las contraseñas deben coincidir' : 
      password == '' || password.length < 8 ? 'La contraseña debe tener más de 8 caracteres' : 
      '')
    setNameError(name == '' ? 'Completa un nombre' : '')
    setLastNameError(lastname == '' ? 'Completa un apellido' : '')
    setEmailError(checkEmail(email))
  }

  const [passwordError, setPasswordError] = useState('')
  const [userError, setUserError] = useState('')
  const [nameError, setNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <View style={styles.container}>
      <Typography variant='h3'>Registrate</Typography>

      <OutlinedInput
        errorMessage={userError}
        label='Usuario' 
        value={user} 
        onChangeText={setUser} 
      />

      <OutlinedInput
        errorMessage={nameError}
        label='Nombre' 
        value={name} 
        onChangeText={setName} 
      />

      <OutlinedInput
        errorMessage={lastNameError}
        label='Apellido'
        value={lastname}
        onChangeText={setLastname}
      />

      <OutlinedInput 
        errorMessage={emailError}
        label='Email' 
        value={email} 
        onChangeText={setEmail} 
      />

      <OutlinedInput
        errorMessage={passwordError}
        label='Contraseña'
        value={password}
        onChangeText={setPassword}
      />

      <OutlinedInput
        error={passwordError !== ''}
        label='Repetir contraseña'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Typography variant='subtitle' color='dark'>
        ¿Ya tenés cuenta? <Link href='../login'>Ingresar</Link>
      </Typography>

      <StyledButton label='Entrar' onPress={onSubmit} />
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
