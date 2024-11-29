import { useAuthorizedUser } from '@/hooks/useUser'
import EgressPage from '@/pages/EgressPage/EgressPage'

export default function () {
  useAuthorizedUser()
  return <EgressPage />
}