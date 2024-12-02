import shiftService from '@/services/shifts.service'
import { useQuery } from 'react-query'

export default function useChartdata() {
  const { data, refetch, remove, ...rest } = useQuery(
    ['chartData'],
    () => shiftService.getChartData(),
    {
      initialData: undefined,
      cacheTime: 0,
    },
  )

  return {
    ...rest,
    chartData: data,
  }
}
