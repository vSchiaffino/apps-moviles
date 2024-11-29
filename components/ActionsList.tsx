import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import IconList from '@/pages/IconList'

const ActionsList = ({ isRowSelected, mainIcons = [], additionalIcons = [] }: any) => {
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [hasFadedIn, setHasFadedIn] = useState(true)

  useEffect(() => {
    if (hasFadedIn) {
      fadeAnim.setValue(0)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setHasFadedIn(true)
      })
    }
  }, [isRowSelected])
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <IconList icons={isRowSelected ? additionalIcons : mainIcons} />
      </Animated.View>
    </View>
  )
}

export default ActionsList
