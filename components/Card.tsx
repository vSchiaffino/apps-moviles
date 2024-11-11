import {
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native'
import React from 'react'

export type CardProps = TouchableOpacityProps &
  ViewProps & {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
    pressable?: boolean
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
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,

        ...Object(style),
      }}
      {...rest}
    >
      {children}
    </MainComponent>
  )
}

export default Card
