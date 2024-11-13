import reportService from '@/services/reports.service'
import { useQuery } from 'react-query'

export function useReportData(initialDate: string, finalDate: string) {
  const { data, ...rest } = useQuery(['report', initialDate, finalDate], () => {
    if (!initialDate || !finalDate) return
    return reportService.get(initialDate, finalDate)
  })

  return {
    report: data as ReportData,
    ...rest,
  }
}
