import { View, Text, ColorSchemeName, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import Typography from '../Typography'

export type TabBarButtonProps = {
  iconName: any
  colorScheme: ColorSchemeName
  focused?: boolean
  onPress: any
  label?: string
}

const TabBarButton = ({
  iconName,
  colorScheme,
  focused,
  onPress,
  label = '',
}: TabBarButtonProps) => {
  const viewRef = useRef<any>(null)
  const labelRef = useRef<any>(null)
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 1 },
        1: { scale: iconName === 'home' && !label ? 1.1 : 1.3 },
      })
      if (label) {
        labelRef.current.animate({ 0: { scale: 1, height: 20 }, 1: { scale: 0, height: 0 } })
      }
    } else {
      viewRef.current.animate({ 0: { scale: iconName === 'home' ? 1.1 : 1.3 }, 1: { scale: 1 } })
      if (label) {
        labelRef.current.animate({ 0: { scale: 0, height: 0 }, 1: { scale: 1, height: 20 } })
      }
    }
  }, [focused])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={!focused ? onPress : () => {}} hitSlop={20} activeOpacity={0.8}>
        <Animatable.View
          ref={viewRef}
          duration={500}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          {iconName !== 'warehouse' ? (
            <Ionicons
              name={iconName}
              size={iconName === 'home' && !label ? 40 : 24}
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
          {label && (
            <Animatable.View ref={labelRef} duration={500}>
              <Typography
                justify="center"
                variant="mini"
                color={'primary'}
                style={{ fontSize: 13, margin: 0, padding: 0 }}
              >
                {label}
              </Typography>
            </Animatable.View>
          )}
        </Animatable.View>
      </TouchableOpacity>
    </View>
  )
}

export default TabBarButton
