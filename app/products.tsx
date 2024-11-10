import React from 'react'
import ProductsPage from '@/pages/ProductPage/ProductPage'
import { useAuthorizedUser } from '@/hooks/useUser'

const products = () => {
  useAuthorizedUser()
  return <ProductsPage />
}

export default products
