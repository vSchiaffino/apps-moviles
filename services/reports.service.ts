import apiService from './api.service'

export class ReportService {
  public async get(initialDate: string, finalDate: string) {
    const response = await apiService.get(`/reports?start=${initialDate}&end=${finalDate}`)
    return response.json()
  }
}

const reportService = new ReportService()
export default reportService
