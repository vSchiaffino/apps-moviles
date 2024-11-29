import { useAuthorizedUser } from '@/hooks/useUser'
import WarehouseReport from '@/pages/ReportsPage/WarehouseReportPage'

export default function () {
  useAuthorizedUser()
  return <WarehouseReport />
}