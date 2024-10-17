import { View, StyleProp, ViewStyle, TouchableOpacity, ViewProps } from 'react-native'
import React from 'react'

export interface CardProps extends ViewProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  pressable?: boolean
  onPress?: Function
}

const Card: React.FC<CardProps> = ({ children, style, pressable = false, ...rest }) => {
  const MainComponent: any = pressable ? TouchableOpacity : View

  return (
    <MainComponent
      style={{
        width: '100%',
        height: '100%',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        ...Object(style),
      }}
      onPress={() => {
        rest.onPress && rest.onPress()
      }}
      {...rest}
    >
      {children}
    </MainComponent>
  )
}

export default Card
