import React from 'react'
import Card from './Card'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'

const IconCard = ({
  icon,
  color,
  text,
  onPress,
}: {
  icon:
    | 'cube-outline'
    | 'ban-outline'
    | 'camera-outline'
    | 'image-outline'
    | 'trash-outline'
    | 'warehouse'
  color: 'primary' | 'danger' | 'gray'
  text: string
  onPress?: Function
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
