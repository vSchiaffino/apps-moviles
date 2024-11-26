import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Href, Tabs, router } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { AuthProvider } from '@/context/AuthContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'
import TabBarButton from '@/components/navigation/TabBarButton'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout(this: any) {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    Roboto: require('@/assets/fonts/Roboto-Regular.ttf'),
    Geist: require('@/assets/fonts/GeistMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const tabs = [
    { name: 'products', iconName: 'cube' },
    { name: 'stock-manager', iconName: 'archive' },
    { name: 'dashboard', iconName: 'home' },
    { name: 'warehouse', iconName: 'warehouse' },
    { name: 'profile', iconName: 'person' },
  ]

  const queryClient = new QueryClient()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <Tabs
              backBehavior="history"
              screenOptions={() => ({
                unmountOnBlur: true,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarVisibilityAnimationConfig: {
                  hide: {
                    config: { duration: 150 },
                    animation: 'timing',
                  },
                },
                tabBarStyle: {
                  position: 'absolute',
                  height: 60,
                  bottom: 16,
                  right: 16,
                  left: 16,
                  borderRadius: 16,
                  backgroundColor:
                    colorScheme === 'dark'
                      ? DarkTheme.colors.background
                      : DefaultTheme.colors.background,
                },
              })}
            >
              {tabs.map(({ name, iconName }, index) => (
                <Tabs.Screen
                  key={index}
                  name={name}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: ({ accessibilityState }) => (
                      <TabBarButton
                        iconName={iconName}
                        colorScheme={colorScheme}
                        focused={accessibilityState?.selected}
                        onPress={() => {
                          router.push(('/' + name) as Href<string | object>)
                        }}
                      />
                    ),
                  }}
                />
              ))}
              <Tabs.Screen name="reports" options={{ href: null }} />
            </Tabs>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
