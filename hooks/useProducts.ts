import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import productService from '@/services/product.service'
import { useQuery } from 'react-query'

export default function useProducts(pagination: Pagination, sort: Sort, filters: any[] = []) {
  const { data, refetch, ...rest } = useQuery(['products', pagination, sort], () =>
    productService.findMany(pagination, sort),
  )
  return {
    edit: async (id: number, product: any) => {
      await productService.edit(id, product)
      refetch()
    },
    create: async (product: any) => {
      await productService.create(product)
      refetch()
    },
    products:
      data?.data &&
      data.data.map((item: any) => ({
        ...item,
        stock: item.storedIn.reduce((acc: number, stock: any) => acc + stock.quantity, 0),
      })),
    total: data?.total,
    ...rest,
  }
}
