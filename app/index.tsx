import Card from '@/components/Card'
import Typography from '@/components/Typography'
import useUser from '@/hooks/useUser'
import { Redirect } from 'expo-router'
import React from 'react'
import { Text, View, Image }  from 'react-native'

const Dashboard = () => {
  const { user } = useUser()
  if (!user) return <Redirect href='/login' />
  return( 
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>        
      <Typography variant='h5'>Hola, {user.user}</Typography>
      <Card title='Gráfico de tortas' variant='columns'/>
    </View>
  )
}

export default Dashboard
