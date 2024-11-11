import Pagination from '@/models/Pagination'
import apiService from './api.service'
import Sort from '@/models/Sort'

// TODO add authorization to this endpoints
export class WarehouseService {
  public async edit(id: number, warehouse: any) {
    warehouse = { ...warehouse, capacity: parseInt(warehouse.capacity) }
    return await apiService.put(`/warehouses/${id}`, warehouse)
  }

  public async create(warehouse: any) {
    warehouse = { ...warehouse, capacity: parseInt(warehouse.capacity) }
    return await apiService.post('/warehouses', warehouse)
  }

  public async findMany(pagination: Pagination, sort: Sort) {
    const query = new URLSearchParams()
    query.append('page', pagination.page.toString())
    query.append('limit', pagination.limit.toString())
    query.append('sort', `${sort.field},${sort.direction}`)

    const response = await apiService.get(`/warehouses?${query.toString()}`)
    return await response.json()
  }

  public async findOne(id: number) {
    const response = await apiService.get(`/warehouses/${id}`)
    return await response.json()
  }

  public async addStock(id: number, stock: any) {
    return await apiService.post(`/warehouses/${id}/stock`, stock)
  }
}

const warehouseService = new WarehouseService()
export default warehouseService
