import React from 'react'
import { View } from 'react-native'
import { TableColumn } from './Table'
import { Colors } from '@/constants/Colors'
import Typography from '../Typography'

export const TableHeader: React.FC<{ columns: TableColumn[] }> = ({ columns }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        aspectRatio: 25 / 3,
        backgroundColor: Colors.primary[200],
        padding: 10,
      }}
    >
      {columns.map(({ width, title, align }, index) => (
        <Typography
          key={index}
          variant="body"
          font="roboto"
          justify={
            align && (align === 'flex-start' ? 'left' : align === 'center' ? 'center' : 'right')
          }
          style={{
            marginLeft: 1,
            alignContent: 'flex-end',
            width,
            color: Colors.primary[600],
          }}
        >
          {title}
        </Typography>
      ))}
    </View>
  )
}
