import apiService, { ApiValidationError } from './api.service'

// TODO add authorization to this endpoints
export class StockLevelService {
  async getByDate(date: string): Promise<any | null> {
    try {
      const response = await apiService.get(`/stock-levels?date=${date}`)
      return response.json()
    } catch (error: any) {
      if (error instanceof ApiValidationError) {
        return null
      }
    }
  }

  async edit(id: number, stockLevels: any) {
    await apiService.put(`/stock-levels/${id}`, stockLevels)
  }

  async create(stockLevels: any) {
    await apiService.post(`/stock-levels`, stockLevels)
  }
}

const stockLevelService = new StockLevelService()
export default stockLevelService
