import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import warehouseService from '@/services/warehouse.service'
import { useQuery } from 'react-query'

export function useWarehouses(pagination: Pagination, sort: Sort) {
  const { data, refetch, ...restQuery } = useQuery(['warehouses', pagination, sort], () =>
    warehouseService.findMany(pagination, sort),
  )

  return {
    warehouses: data?.data,
    total: data?.total,
    create: async (warehouse: any) => {
      await warehouseService.create(warehouse)
      refetch()
    },
    edit: async (id: number, warehouse: any) => {
      await warehouseService.edit(id, warehouse)
      refetch()
    },
    ...restQuery,
  }
}
