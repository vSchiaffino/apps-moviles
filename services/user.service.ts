import apiService from './api.service'

export class UserService {
  public async login(user: string, password: string) {
    return await apiService.post('/users/login', { user, password })
  }

  public async register(createUserDto: {
    user: string
    name: string
    lastName: string
    mail: string
    password: string
  }) {
    return await apiService.post('/users', createUserDto)
  }
}

const userService = new UserService()
export default userService
