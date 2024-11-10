import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import Typography from './Typography'
import { Ionicons } from '@expo/vector-icons'
import PageHeader from './PageHeader'

export interface ContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  pageHeader?: string
}

const Container: React.FC<ContainerProps> = ({ children, style, pageHeader }) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          paddingTop: pageHeader === undefined ? 48 : 0,
          padding: 16,
          backgroundColor: Colors.gray[100],
          ...Object(style),
        }}
      >
        {children}
      </View>
    </>
  )
}

export default Container
