import apiService, { ApiValidationError } from './api.service'

// TODO add authorization to this endpoints
export class ShiftsService {
  async getActive() {
    const response = await fetch(apiService.baseUrl + '/shifts', {
      method: 'GET',
    })
    if (response.status === 200) return response.json()
    if (response.status === 404) return null

    Error('Server error')
  }

  async endCurrent() {
    const response = await apiService.post('/shifts/end', {})
    if (response.status === 201) return
    const { message, field } = await response.json()
    throw new ApiValidationError(message, field)
  }

  async start() {
    const response = await apiService.post('/shifts', {})
    if (response.status === 201) return
    const { message, field } = await response.json()
    throw new ApiValidationError(message, field)
  }
}

const shiftService = new ShiftsService()
export default shiftService
