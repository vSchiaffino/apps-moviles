export class ApiValidationError extends Error {
  public field: string
  constructor(message: string, field: string) {
    super(message)
    this.field = field
  }
}

export class ApiService {
  private baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL
  async post(endpoint: string, body: any) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status >= 500) {
      console.log(response.body, response.status)
      throw new Error('Server error')
    } else if (response.status >= 400) {
      const { message, field } = await response.json()
      throw new ApiValidationError(message, field)
    }
    return response
  }

  async get(endpoint: string) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'GET',
    })
    if (response.status >= 500) {
      console.log(response.body, response.status)
      throw new Error('Server error')
    } else if (response.status >= 400) {
      const { message, field } = await response.json()
      throw new ApiValidationError(message, field)
    }
    return response
  }

  async put(endpoint: string, body: any) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status >= 500) {
      console.log(response.body, response.status)
      throw new Error('Server error')
    } else if (response.status >= 400) {
      const { message, field } = await response.json()
      throw new ApiValidationError(message, field)
    }
    return response
  }
}

const apiService = new ApiService()
export default apiService
