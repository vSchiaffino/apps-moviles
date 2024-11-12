import { useNotAuthorizedUser } from '@/hooks/useUser'
import LoginPage from '@/pages/LoginPage'

export default function () {
  useNotAuthorizedUser()
  return <LoginPage />
}
