import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { ThemeProvider } from '@react-navigation/native'

export interface PageHeaderProps {
  title: string
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const colorScheme = useColorScheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
      }}
    >
      <Ionicons
        name="chevron-back-sharp"
        size={24}
        color={colorScheme === 'dark' ? Colors.gray[100] : Colors.gray[700]}
      />
      <Typography
        variant="h5"
        style={{ color: colorScheme === 'dark' ? Colors.gray[100] : Colors.gray[700] }}
      >
        {title}
      </Typography>
    </View>
  )
}

export default PageHeader
