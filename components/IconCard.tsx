import { View, Text } from 'react-native'
import React from 'react'
import Card from './Card'
import { Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'

const IconCard = ({
  icon,
  color,
  text,
}: {
  icon: 'cube-outline' | 'ban-outline'
  color: 'primary' | 'danger'
  text: string
}) => {
  const colorPallete = Colors[color]
  return (
    <Card
      pressable
      style={{
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPallete[200],
        gap: 5,
      }}
    >
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
      <Typography color={color} variant="body">
        {text}
      </Typography>
    </Card>
  )
}

export default IconCard
