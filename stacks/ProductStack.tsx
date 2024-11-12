import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsPage from '@/pages/ProductPage/ProductPage'

export type WarehouseStackParamList = {
  'product-page': undefined
}

const Stack = createNativeStackNavigator<WarehouseStackParamList>()

const ProductStack = () => {
  return (
    <Stack.Navigator id="product" initialRouteName="product-page">
      <Stack.Screen component={ProductsPage} name="product-page" options={{ title: 'Productos' }} />
    </Stack.Navigator>
  )
}

export default ProductStack
