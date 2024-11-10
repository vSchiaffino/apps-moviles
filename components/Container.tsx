import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import Typography from './Typography'
import { Spacing } from '@/constants/Spacing'
import { Ionicons } from '@expo/vector-icons'

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
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: 'black',
          shadowRadius: 5,
          shadowOffset: { width: 10, height: 10 },
          elevation: 3,
          shadowOpacity: 1,
          backgroundColor: Colors.primary[100],
          paddingTop: 52,
          padding: 10,
          zIndex: 999,
        }}
      >
        <Ionicons
          name="chevron-back-sharp"
          size={30}
          color={Colors.gray[700]}
          style={{ paddingBottom: 5, position: 'absolute', right: '93%', bottom: '33%' }}
        />
        <Typography variant="h4" style={{ color: Colors.gray[700] }}>
          {pageHeader}
        </Typography>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
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
