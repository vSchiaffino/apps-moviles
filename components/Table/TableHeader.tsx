import React from 'react'
import { Pressable, View } from 'react-native'
import { TableColumn } from './Table'
import { Colors } from '@/constants/Colors'
import Typography, { Fonts } from '../Typography'
import { Ionicons } from '@expo/vector-icons'

export interface TableHeaderProps {
  columns: TableColumn[]
  headerFont?: Fonts
  sort?: { column: string; direction: 'ASC' | 'DESC' }
  onChangeSort?: (column: string, direction: 'ASC' | 'DESC') => void
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  headerFont,
  sort,
  onChangeSort,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        aspectRatio: 25 / 3,
        backgroundColor: Colors.primary[200],
        padding: 10,
        gap: 10,
      }}
    >
      {columns.map(({ width, title, align, font, key }, index) => (
        <Pressable
          key={key}
          style={{ width, flexDirection: 'row', gap: 5, alignItems: 'center' }}
          onPress={() => {
            if (onChangeSort && sort) {
              if (sort.column === key) {
                onChangeSort(key, sort.direction === 'ASC' ? 'DESC' : 'ASC')
              } else {
                onChangeSort(key, 'ASC')
              }
            }
          }}
        >
          <Typography
            key={index}
            variant="body"
            font={headerFont}
            justify={
              align && (align === 'flex-start' ? 'left' : align === 'center' ? 'center' : 'right')
            }
            style={{
              textTransform: 'uppercase',
              marginLeft: 1,
              alignContent: 'flex-end',
              color: Colors.primary[600],
            }}
          >
            {title}
          </Typography>
          {sort && sort.column === key && (
            <Ionicons
              name={sort.direction === 'ASC' ? 'arrow-down-outline' : 'arrow-up-outline'}
              size={19}
              color={Colors.primary[600]}
            />
          )}
        </Pressable>
      ))}
    </View>
  )
}
