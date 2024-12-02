import { useColorScheme, Image } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { useAuthorizedUser } from '@/hooks/useUser'
import { TouchableOpacity } from 'react-native-gesture-handler'

const StackLayout = () => {
  const scheme = useColorScheme()
  const { user } = useAuthorizedUser()
  const pic = user?.profilePictureUrl

  return (
    <Stack
      initialRouteName="dashboard"
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: `Hola, ${user?.user}`,
          headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={20}
              onPress={() => router.push('/profile')}
            >
              <Image source={{ uri: pic }} style={{ width: 35, height: 35, borderRadius: 99 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="startshift" options={{ headerTitle: 'Iniciar Turno' }} />
      <Stack.Screen name="endshift" options={{ headerTitle: 'Terminar Turno' }} />
      <Stack.Screen name="egress" options={{ headerTitle: 'Egresos del turno' }} />
    </Stack>
  )
}

export default StackLayout
