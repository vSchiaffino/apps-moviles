import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'

export type WarehouseStackParamList = {
  profile: undefined
}

const Stack = createNativeStackNavigator<WarehouseStackParamList>()

const ProfileStack = () => {
  return (
    <Stack.Navigator id="profile" initialRouteName="profile">
      <Stack.Screen component={ProfilePage} name="profile" options={{ title: 'Productos' }} />
    </Stack.Navigator>
  )
}

export default ProfileStack
