import { View, Text, ColorSchemeName, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'

export type TabBarButtonProps = {
  iconName: any
  colorScheme: ColorSchemeName
  focused?: boolean
  onPress: any
}

const TabBarButton = ({ iconName, colorScheme, focused, onPress }: TabBarButtonProps) => {
  const viewRef = useRef<any>(null)
  useEffect(() => {
    focused
      ? viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1.3 } })
      : viewRef.current.animate({ 0: { scale: 1.3 }, 1: { scale: 1 } })
  }, [focused])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onPress} hitSlop={20} activeOpacity={0.7}>
        <Animatable.View ref={viewRef} duration={300}>
          {iconName !== 'warehouse' ? (
            <Ionicons
              name={iconName}
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
          )}
        </Animatable.View>
      </TouchableOpacity>
    </View>
  )
}

export default TabBarButton
