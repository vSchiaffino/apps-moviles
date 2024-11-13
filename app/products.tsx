import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsPage from '@/pages/ProductPage/ProductPage'
import PageHeader from '@/components/PageHeader'
import { useAuthorizedUser } from '@/hooks/useUser'

const Stack = createNativeStackNavigator()

const products = () => {
  useAuthorizedUser()
  return (
    <Stack.Navigator initialRouteName="products" screenOptions={{ header: PageHeader }}>
      <Stack.Screen
        name="products-page"
        component={ProductsPage}
        options={{ title: 'Productos' }}
      />
    </Stack.Navigator>
  )
}

export default products
