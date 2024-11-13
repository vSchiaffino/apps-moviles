import { useAuthorizedUser } from '@/hooks/useUser'
import StockManagerPage from '@/pages/StockPage/StockManagerPage'

export default function () {
  useAuthorizedUser()
  return <StockManagerPage />
}
