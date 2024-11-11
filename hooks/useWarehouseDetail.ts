import warehouseService from '@/services/warehouse.service'
import { useQuery } from 'react-query'

export function useWarehouseDetail(id: number) {
  const { data, refetch, ...restQuery } = useQuery(['warehouse-detail', id], () =>
    warehouseService.findOne(id),
  )

  return {
    warehouse: data,
    refetch,
    ...restQuery,
  }
}
