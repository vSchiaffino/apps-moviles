import shiftService from '@/services/shifts.service'
import { useQuery } from 'react-query'

export default function useOneShiftData(id?: number) {
  const { data, refetch, remove, ...rest } = useQuery(['useOneShiftData', id], () =>
    id ? shiftService.findOne(id) : null,
  )
  return {
    shift: data,
    ...rest,
  }
}
