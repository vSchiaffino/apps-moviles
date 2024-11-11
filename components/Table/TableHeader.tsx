import React from 'react'
import { Pressable, View } from 'react-native'
import { TableColumn } from './Table'
import { Colors } from '@/constants/Colors'
import Typography, { Fonts } from '../Typography'
import { Ionicons } from '@expo/vector-icons'
import Sort from '@/models/Sort'

export interface TableHeaderProps {
  columns: TableColumn[]
  headerFont?: Fonts
  sort?: Sort
  onChangeSort?: (sort: Sort) => void
  sortingFields?: string[]
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  headerFont,
  sort,
  onChangeSort,
  sortingFields = [],
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,

        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 1,
      }}
    >
      {columns.map(({ width, title, align, font, key }, index) => (
        <Pressable
          key={key}
          style={{ width, flexDirection: 'row', gap: 5, alignItems: 'center' }}
          onPress={
            sortingFields.includes(key)
              ? () => {
                  if (onChangeSort && sort) {
                    const field = key
                    const direction =
                      key === sort.field ? (sort.direction === 'ASC' ? 'DESC' : 'ASC') : 'ASC'
                    onChangeSort({ field, direction })
                  }
                }
              : undefined
          }
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
          {sortingFields.includes(key) && sort && sort.field === key && (
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
