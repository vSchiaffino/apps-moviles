import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import productService from '@/services/product.service'
import { useQuery } from 'react-query'

export default function useProducts(pagination: Pagination, sort: Sort) {
  const { data, ...rest } = useQuery(['products', pagination, sort], () =>
    productService.findMany(pagination, sort),
  )
  return {
    edit: async (product: any) => {},
    create: async (product: any) => {},
    products: data?.data,
    total: data?.total,
    ...rest,
  }
}
