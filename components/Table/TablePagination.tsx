import React from 'react'
import { View } from 'react-native'
import OutlinedSelect from '../OutlinedSelect/OutlinedSelect'
import Typography from '../Typography'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import Pagination from '@/models/Pagination'

export interface TablePaginationProps {
  pagination: {
    total: number
    page: number
    limit: number
    actual: number
  }
  onChangePagination: (pagination: Pagination) => void
  entityName: string
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  pagination,
  onChangePagination,
  entityName,
}) => {
  const { limit, page, actual, total } = pagination
  const start = (page - 1) * limit + 1
  const end = start + actual - 1
  const lastPage = Math.ceil(total / limit)
  return (
    <View
      style={{
        gap: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <View style={{ width: 50 }}>
        <OutlinedSelect
          option={limit}
          options={[5, 10, 15, 20]}
          setOption={(limit) => onChangePagination({ ...pagination, limit })}
        />
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Typography variant="body" style={{ marginRight: 10 }}>
          {start}-{end} {entityName} de {pagination.total}
        </Typography>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
        <Ionicons
          onPress={() => {
            if (page === 1) return
            onChangePagination({ ...pagination, page: page - 1 })
          }}
          name="chevron-back-outline"
          color={page === 1 ? Colors.gray[400] : Colors.gray[800]}
          size={30}
          style={{ backgroundColor: Colors.gray[200], padding: 5, borderRadius: 999999 }}
        />
        <Ionicons
          onPress={() => {
            if (page === lastPage) return
            onChangePagination({ ...pagination, page: page + 1 })
          }}
          name="chevron-forward-outline"
          color={page === lastPage ? Colors.gray[400] : Colors.gray[800]}
          size={30}
          style={{ backgroundColor: Colors.gray[200], padding: 5, borderRadius: 999999 }}
        />
      </View>
    </View>
  )
}
