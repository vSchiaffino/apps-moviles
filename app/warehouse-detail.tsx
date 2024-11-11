import React from 'react'
import { useAuthorizedUser } from '@/hooks/useUser'
import WarehouseDetailPage from '@/pages/WarehouseDetailPage/WarehouseDetailPage'

const warehouse = () => {
  useAuthorizedUser()
  return <WarehouseDetailPage />
}

export default warehouse
