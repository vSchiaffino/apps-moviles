import { View, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

export interface CardProps {
  children: React.ReactNode
  style: StyleProp<ViewStyle>
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        ...(style as any),
      }}
    >
      {children}
    </View>
  )
}

export default Card
