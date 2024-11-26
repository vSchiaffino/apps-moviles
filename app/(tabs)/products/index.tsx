import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsPage from '@/pages/ProductPage/ProductPage'
import { useAuthorizedUser } from '@/hooks/useUser'

const Stack = createNativeStackNavigator()

const products = () => {
  useAuthorizedUser()
  return <ProductsPage />
}

export default products
