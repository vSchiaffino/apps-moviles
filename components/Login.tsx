import { Pressable, StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'

const Login = () => {

  return (
    <View style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        gap: 10,
    }}>

      <Text style={{fontSize: 32,  fontFamily: 'Poppins'}}>
         Login
      </Text>

      <TextInput 
        placeholderTextColor={'grey'} 
        placeholder='Usuario o correo electrónico'
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins', 
            margin: 5, 
            borderWidth: 1,
            borderRadius: 2
        }}/>
      
      <TextInput 
        placeholderTextColor={'grey'} 
        placeholder='Contraseña' 
        secureTextEntry={true}
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins', 
            margin: 5, 
            borderWidth: 1,
            borderRadius: 2,
        }}/>
      
      <Text>¿No tenés cuenta? <Link href="../register">Crear usuario</Link></Text>
      <Button title='Entrar'/>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({})