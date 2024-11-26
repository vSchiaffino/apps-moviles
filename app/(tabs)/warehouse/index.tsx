import React from 'react'
import WarehousePage from '@/pages/WarehousePage/WarehousePage'
import { useAuthorizedUser } from '@/hooks/useUser'

const Warehouse = () => {
  useAuthorizedUser()
  return <WarehousePage />
}

export default Warehouse
