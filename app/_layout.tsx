import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Tabs } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { AuthProvider } from '@/context/AuthContext'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from 'react-query'
import PageHeader from '@/components/PageHeader'
import { Easing } from 'react-native'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const tabs = [
  {
    name: 'profile',
    title: 'Productos',
    showHeader: true,
    iconName: 'person',
  },
  {
    name: 'index',
    title: 'Inicio',
    showHeader: false,
    iconName: 'home',
  },
  {
    name: 'warehouse',
    title: 'Depósitos',
    showHeader: true,
    iconName: 'warehouse',
  },
  {
    name: 'products',
    title: 'Productos',
    showHeader: true,
    iconName: 'cube',
  },
]

const invisibleTabs = ['+not-found', 'login', 'register', 'warehouse-detail', 'warehouse-transfer']

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    Geist: require('../assets/fonts/GeistMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }
  const queryClient = new QueryClient()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <Tabs
              screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarVisibilityAnimationConfig: {
                  hide: {
                    config: { duration: 150 },
                    animation: 'timing',
                  },
                },
                tabBarStyle: {
                  display: ['login', 'register'].includes(route.name) ? 'none' : 'flex',
                  position: 'absolute',
                  paddingBottom: 10,
                  paddingTop: 10,
                  height: 65,
                  width: '90%',
                  left: '5%',
                  borderTopRightRadius: 16,
                  borderTopLeftRadius: 16,
                  backgroundColor:
                    colorScheme === 'dark'
                      ? DarkTheme.colors.background
                      : DefaultTheme.colors.background,
                },
              })}
            >
              {tabs.map(({ name, title, showHeader, iconName }, index) => (
                <Tabs.Screen
                  key={index}
                  name={name}
                  options={{
                    title: title,
                    headerShown: showHeader,
                    headerTitle: showHeader ? () => <PageHeader title={title} /> : undefined,
                    tabBarIcon: ({ focused }) =>
                      iconName !== 'warehouse' ? (
                        <Ionicons
                          name={iconName as keyof typeof Ionicons.glyphMap}
                          size={24}
                          color={
                            focused
                              ? Colors.primary[600]
                              : colorScheme === 'dark'
                                ? Colors.gray[300]
                                : Colors.gray[600]
                          }
                        />
                      ) : (
                        <FontAwesome6
                          name={iconName}
                          size={20}
                          color={
                            focused
                              ? Colors.primary[600]
                              : colorScheme === 'dark'
                                ? Colors.gray[300]
                                : Colors.gray[600]
                          }
                        />
                      ),
                  }}
                />
              ))}
              {invisibleTabs.map((name, index) => (
                <Tabs.Screen key={index} name={name} options={{ href: null }} />
              ))}
            </Tabs>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
