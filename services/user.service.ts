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

  public async editUser(
    jwt: string,
    editUserDto: { user?: string; name: string; lastName: string; mail?: string },
  ) {
    return await apiService.put('/users', editUserDto, { Authorization: jwt })
  }

  public async changePassword(
    jwt: string,
    changePasswordDto: { password: string; newPassword: string },
  ) {
    return await apiService.put('/users/password', changePasswordDto, { Authorization: jwt })
  }
}

const userService = new UserService()
export default userService
