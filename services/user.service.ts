import AsyncStorage from '@react-native-async-storage/async-storage'
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

  public async changePicture(uri: string) {
    const formData = new FormData()
    const file = {
      uri,
      type: 'image/jpeg',
      name: 'profile_picture.jpg',
    }
    formData.append('file', file as any)

    return await fetch(apiService.baseUrl + '/users/picture', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: await AsyncStorage.getItem('jwt'),
      } as any,
      body: formData,
    })
  }
}

const userService = new UserService()
export default userService
