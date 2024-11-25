import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Href, Tabs, router } from 'expo-router'
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
import TabBarButton from '@/components/navigation/TabBarButton'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const tabs = [
  {
    name: 'products',
    title: 'Productos',
    iconName: 'cube',
  },
  {
    name: 'stock-manager',
    title: 'Administrar Stock',
    showRootHeader: true,
    iconName: 'archive',
  },
  {
    name: 'dashboard',
    title: 'Inicio',
    iconName: 'home',
  },
  {
    name: 'warehouse',
    title: 'Depósitos',
    iconName: 'warehouse',
  },
  {
    name: 'profile',
    title: 'Perfil',
    showRootHeader: true,
    iconName: 'person',
  },
]

const invisibleTabs = [
  { name: 'stock-summary', title: 'Resumen Stock', showRootHeader: true },
  { name: 'reports', title: 'Reportes', showRootHeader: true },
]

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
              {tabs.map(({ name, title, iconName, showRootHeader = false }, index) => (
                <Tabs.Screen
                  key={index}
                  name={name}
                  options={{
                    tabBarShowLabel: false,
                    tabBarLabel: title,
                    header: (props: any) => <PageHeader {...props} back={undefined} />,
                    headerShown: showRootHeader,
                    tabBarButton: ({ accessibilityState }) => (
                      <TabBarButton
                        onPress={() => router.push(('/' + name) as Href<string | object>)}
                        iconName={iconName}
                        colorScheme={colorScheme}
                        focused={accessibilityState?.selected}
                      />
                    ),
                    tabBarIcon: ({ focused }) =>
                      iconName !== 'warehouse' ? (
                        <Ionicons
                          name={iconName as keyof typeof Ionicons.glyphMap}
                          size={24}
                          color={
                            focused
                              ? Colors.primary[500]
                              : colorScheme === 'dark'
                                ? Colors.primary[300]
                                : Colors.primary[500]
                          }
                        />
                      ) : (
                        <FontAwesome6
                          name={iconName}
                          size={20}
                          color={
                            focused
                              ? Colors.primary[500]
                              : colorScheme === 'dark'
                                ? Colors.primary[300]
                                : Colors.primary[500]
                          }
                        />
                      ),
                  }}
                />
              ))}
              {invisibleTabs.map(({ name, title = '', showRootHeader }, index) => (
                <Tabs.Screen
                  key={index}
                  name={name}
                  options={{
                    title: title,
                    href: null,
                    header: showRootHeader
                      ? (props: any) => <PageHeader {...props} back={undefined} />
                      : () => <></>,
                    headerShown: showRootHeader,
                  }}
                />
              ))}
            </Tabs>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
