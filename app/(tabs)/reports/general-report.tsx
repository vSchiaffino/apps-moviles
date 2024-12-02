import { useAuthorizedUser } from '@/hooks/useUser'
import GeneralReport from '@/pages/ReportsPage/GeneralReportPage'

export default function () {
  useAuthorizedUser()
  return <GeneralReport />
}