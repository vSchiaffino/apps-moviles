import React, { useEffect } from 'react'
import Card from './Card'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated'

const IconCard = ({
  icon,
  color,
  text,
  onPress,
  style,
  isShiftActive = false,
}: {
  icon: keyof typeof Ionicons.glyphMap | 'warehouse'
  color: 'primary' | 'danger' | 'gray' | 'green' | 'yellow'
  text: string
  style?: StyleProp<ViewStyle>
  onPress?: (event: GestureResponderEvent) => void
  isShiftActive?: boolean
}) => {
  const colorPallete = Colors[color]
  const rotation = useSharedValue(0)
  const zoom = useSharedValue(1)

  useEffect(() => {
    if (isShiftActive) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(360, { duration: 500 }),
          withDelay(1000, withTiming(0, { duration: 0 })),
        ),

        -1,
        false,
      )
      zoom.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 250 }),
          withTiming(1, { duration: 250 }),
          withDelay(1000, withTiming(1, { duration: 0 })),
        ),
        -1,
        false,
      )
    } else {
      rotation.value = withTiming(0, { duration: 500 })
    }
  }, [isShiftActive])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
        {
          scale: zoom.value,
        },
      ],
    }
  })

  return (
    <Card
      pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPallete[200],
        gap: 5,
        ...Object(style),
      }}
    >
      <Animated.View style={animatedStyle}>
        {icon === 'warehouse' ? (
          <FontAwesome6
            name={icon}
            size={32}
            color={colorPallete[600]}
            style={{
              backgroundColor: colorPallete[300],
              borderRadius: 99,
              padding: 16,
            }}
          />
        ) : (
          <Ionicons
            name={icon}
            size={32}
            color={colorPallete[600]}
            style={{
              backgroundColor: colorPallete[300],
              borderRadius: 99,
              padding: 16,
            }}
          />
        )}
      </Animated.View>
      <Typography color={color} variant="body">
        {text}
      </Typography>
    </Card>
  )
}

export default IconCard
