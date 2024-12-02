import { TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { Stack, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { CommonActions } from '@react-navigation/native'

const StackLayout = () => {
  const scheme = useColorScheme()
  const navigation = useNavigation()
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontSize: 24 },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Depósitos' }} />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Detalle del depósito',
          headerLeft: ({ canGoBack }) =>
            canGoBack && (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(
                    CommonActions.reset({ index: 0, routes: [{ name: 'warehouse' }] }),
                  )
                }}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
        }}
      />
    </Stack>
  )
}

export default StackLayout
