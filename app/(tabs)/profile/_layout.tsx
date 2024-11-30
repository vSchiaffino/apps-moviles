import { useColorScheme, Image, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useAuthorizedUser } from '@/hooks/useUser'

const StackLayout = () => {
  const scheme = useColorScheme()
  const { user } = useAuthorizedUser()
  const profilePic = user.profilePictureUrl
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Cuenta',
          // headerRight: () => (
          //   <Pressable onPress={() => alert('this is a stupidmikeross production')}>
          //     <Image
          //       source={{ uri: profilePic }}
          //       style={{ width: 30, height: 30, borderRadius: 99 }}
          //     />
          //   </Pressable>
          // ),
        }}
      />
    </Stack>
  )
}

export default StackLayout
