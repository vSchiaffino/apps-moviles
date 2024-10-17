import { Colors } from '@/constants/Colors'
import React, { useRef } from 'react'
import { Animated, Easing } from 'react-native'

export default function usePressOptionAnimation() {
  const [pressedInOption, setPressedInOption] = React.useState('')
  const animatedValue = useRef(new Animated.Value(0)).current

  const handlePressIn = (option: string) => {
    setPressedInOption(option)
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start()
  }

  const handlePressOut = () => {
    setPressedInOption('')
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start()
  }

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', Colors.gray[200]],
  })

  return { handlePressIn, handlePressOut, pressedInOption, backgroundColor }
}
