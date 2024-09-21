import { Pressable, StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'

const Register = () => {

  return (
    <View style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        gap: 10
      }}
    >

      <Text style={{fontSize: 32,  fontFamily: 'Poppins'}}>
         Register
      </Text>

      <TextInput 
        autoFocus={true}
        placeholderTextColor={'grey'} 
        placeholder='Nombre'
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins', 
            margin: 5, 
            borderWidth: 1,
            borderRadius: 2
        }}
      />
      
      <TextInput 
        placeholderTextColor={'grey'} 
        placeholder='Apellido' 
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins', 
            margin: 5, 
            borderWidth: 1,
            borderRadius: 2,
        }}
      />

      <TextInput 
        placeholderTextColor={'grey'} 
        placeholder='Correo electrónico' 
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins', 
            margin: 5, 
            borderWidth: 1,
            borderRadius: 2,
        }}
      />

      <TextInput 
        placeholderTextColor={'grey'} 
        placeholder='Usuario' 
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins', 
            margin: 5, 
            borderWidth: 1,
            borderRadius: 2,
        }}
      />
      
      <TextInput 
        placeholderTextColor={'grey'} 
        placeholder='Contraseña' 
        secureTextEntry={true}
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins', 
            borderWidth: 1,
            borderRadius: 2,
        }}
      />

      <TextInput 
        placeholderTextColor={'grey'} 
        placeholder='Repetir contraseña' 
        secureTextEntry={true}
        style={{
            backgroundColor: 'none',
            padding: 8, 
            fontFamily: 'Poppins',  
            borderWidth: 1,
            borderRadius: 2,
        }}
      />
      
      <Text>¿Ya estás registrado? <Link href="/login">Ingresar</Link></Text>
      <Button title='Crear usuario'/>

    </View>
  )
}

export default Register

const styles = StyleSheet.create({})