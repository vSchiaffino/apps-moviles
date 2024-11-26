import { useAuthorizedUser } from '@/hooks/useUser'
import ReportsPage from '@/pages/ReportsPage'

export default function () {
  useAuthorizedUser()
  return <ReportsPage />
}