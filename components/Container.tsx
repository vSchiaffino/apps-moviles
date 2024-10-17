import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export interface ContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <View
      style={{
        marginTop: 48,
        width: '100%',
        height: '100%',
        padding: 16,
        backgroundColor: Colors.gray[100],
        ...Object(style),
      }}
    >
      {children}
    </View>
  )
}

export default Container
