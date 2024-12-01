import { CreateEgressDto } from '@/models/create-egress-dto'
import apiService, { ApiValidationError } from './api.service'
import { Shift } from '@/models/shift'

// TODO add authorization to this endpoints
export class ShiftsService {
  async getActive() {
    const response = await fetch(apiService.baseUrl + '/shifts', {
      method: 'GET',
    })
    if (response.status === 200) return (await response.json()) as Shift
    if (response.status === 404) return null

    Error('Server error')
  }
  async findOne(id: number): Promise<Report | null> {
    const response = await apiService.get(`/shifts/${id}`)
    if (response.status === 200) return response.json() as Promise<Report>
    if (response.status === 404) return null
    return null
  }

  async endCurrent(stocks: any[]) {
    const response = await apiService.post('/shifts/end', stocks)
    if (response.status === 201) return
    const { message, field } = await response.json()
    throw new ApiValidationError(message, field)
  }

  async start(stocks: any[]) {
    const response = await apiService.post('/shifts', stocks)
    if (response.status === 201) return
    const { message, field } = await response.json()
    throw new ApiValidationError(message, field)
  }

  async registerEgress(egress: CreateEgressDto) {
    const response = await apiService.post('/shifts/egress', egress)
    if (response.status === 201) return
    const { message, field } = await response.json()
    throw new ApiValidationError(message, field)
  }
}

const shiftService = new ShiftsService()
export default shiftService
