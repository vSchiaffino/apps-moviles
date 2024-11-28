import { useAuthorizedUser } from '@/hooks/useUser'
import ReportExample from '@/pages/ReportsPage/ReportExample'

export default function () {
  useAuthorizedUser()
  return <ReportExample />
}