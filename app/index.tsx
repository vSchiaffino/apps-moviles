import Typography from '@/components/Typography'
import CenteredCard from '@/components/cardComponents/CenteredCard'
import AsideCard from '@/components/cardComponents/AsideCard'
import ColumnsCard  from '@/components/cardComponents/ColumnsCard'
import ListCard from '@/components/cardComponents/ListCard'
import QuartersCard from '@/components/cardComponents/QuartersCard'
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
    </View>
  )
}

export default Dashboard
