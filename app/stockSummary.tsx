import { useAuthorizedUser } from '@/hooks/useUser'
import StockSummaryPage from '@/pages/StockPage/StockSummaryPage'

export default function () {
  useAuthorizedUser()
  return <StockSummaryPage />
}