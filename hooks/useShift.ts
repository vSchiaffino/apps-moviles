import shiftService from '@/services/shifts.service'
import { useQuery } from 'react-query'

export default function useShift() {
  const { data, refetch, remove, ...rest } = useQuery(['shift'], () => shiftService.getActive(), {
    initialData: undefined,
    cacheTime: 0,
  })
  return {
    ...rest,
    shift: data,
    start: async () => {
      await shiftService.start()
      refetch()
    },
    end: async () => {
      await shiftService.endCurrent()
      refetch()
    },
  }
}
