export class ApiService {
  private baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL
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
