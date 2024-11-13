import React from 'react'
import Card from './Card'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'
import { GestureResponderEvent } from 'react-native'

const IconCard = ({
  icon,
  color,
  text,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap | 'warehouse'
  color: 'primary' | 'danger' | 'gray' | 'green' | 'yellow'
  text: string
  onPress?: (event: GestureResponderEvent) => void
}) => {
  const colorPallete = Colors[color]
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
      }}
    >
      {icon === 'warehouse' ? (
        <FontAwesome6
          name={icon}
          size={32}
          color={colorPallete[600]}
          style={{
            backgroundColor: colorPallete[300],
            borderRadius: 24,
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
            borderRadius: 24,
            padding: 16,
          }}
        />
      )}
      <Typography color={color} variant="body">
        {text}
      </Typography>
    </Card>
  )
}

export default IconCard
