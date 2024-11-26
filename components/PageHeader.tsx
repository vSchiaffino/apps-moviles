import { View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { CommonActions } from '@react-navigation/native'
export interface PageHeaderProps {
  title: string
}

const PageHeader = ({ options, navigation, back }: NativeStackHeaderProps) => {
  const { title } = options
  const colorScheme = useColorScheme()
  return (
    <View
      style={{
        backgroundColor: colorScheme === 'dark' ? Colors.gray[900] : 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
        paddingTop: 55,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
        width: '100%',
      }}
    >
      {back && (
        <Ionicons
          name="chevron-back-sharp"
          onPress={() => {
            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'warehouse' }] }))
          }}
          size={24}
          color={colorScheme === 'dark' ? Colors.gray[100] : Colors.gray[700]}
        />
      )}
      <Typography
        variant="h5"
        style={{
          color: colorScheme === 'dark' ? Colors.gray[100] : Colors.gray[700],
        }}
      >
        {title}
      </Typography>
    </View>
  )
}

export default PageHeader
