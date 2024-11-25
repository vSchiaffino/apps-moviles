import { View, Text, StyleProp, ViewStyle, Animated, Easing, useColorScheme } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

export interface ContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  animated?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, style, animated = true }) => {
  const colorScheme = useColorScheme()
  const slideAnim = useRef(new Animated.Value(300)).current
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Animated.View
        style={{
          transform: animated ? [{ translateX: slideAnim }] : undefined,
          width: '100%',
          backgroundColor: colorScheme === 'dark' ? DarkTheme : DefaultTheme,
          ...Object(style),
        }}
      >
        {children}
      </Animated.View>
    </ThemeProvider>
  )
}

export default Container
