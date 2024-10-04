export class ApiService {
  private baseUrl = 'http://192.168.0.21:9000'
  async post(endpoint: string, body: any) {
    // TODO: handle api errors
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  }
}

const apiService = new ApiService()
export default apiService
