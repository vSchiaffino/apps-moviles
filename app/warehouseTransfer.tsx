import { useAuthorizedUser } from '@/hooks/useUser'
import WarehouseTransferPage from '@/pages/TransferPage/WarehouseTransferPage'

export default function () {
  useAuthorizedUser()
  return <WarehouseTransferPage />
}
