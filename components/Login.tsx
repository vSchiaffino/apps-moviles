import { Pressable, StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',}}>
      <Text style={{fontSize: 32,  fontFamily: 'Poppins'}}>Login</Text>
      <TextInput placeholderTextColor={'grey'} placeholder='Ingresa tu usuario' style={{padding: 8, fontFamily: 'Poppins', margin: 5, borderWidth: 1, borderRadius: 2}}/>
      <TextInput placeholderTextColor={'grey'} placeholder='Ingresa tu contraseña' style={{padding: 8, fontFamily: 'Poppins', margin: 5, borderWidth: 1, borderRadius: 2}}/>
      <Button title='Entrar'/>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})