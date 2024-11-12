import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsPage from '@/pages/ProductPage/ProductPage'

const Stack = createNativeStackNavigator()

const products = () => {
  return (
    <Stack.Navigator initialRouteName="products" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="products" component={ProductsPage} />
    </Stack.Navigator>
  )
}

export default products
