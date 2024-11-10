import Pagination from '@/models/Pagination'
import apiService from './api.service'
import Sort from '@/models/Sort'

export class ProductService {
  public async create(product: any) {
    return await apiService.post('/products', product)
  }

  public async findMany(pagination: Pagination, sort: Sort) {
    const query = new URLSearchParams()
    query.append('page', pagination.page.toString())
    query.append('limit', pagination.limit.toString())
    query.append('sort', `${sort.field},${sort.direction}`)

    const response = await apiService.get(`/products?${query.toString()}`)
    return await response.json()
  }
}

const productService = new ProductService()
export default productService
