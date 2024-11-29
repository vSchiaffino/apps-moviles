import { useAuthorizedUser } from '@/hooks/useUser'
import ProductReport from '@/pages/ReportsPage/ProductReportPage'

export default function () {
  useAuthorizedUser()
  return <ProductReport />
}