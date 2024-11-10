import React from 'react'
import { View } from 'react-native'
import OutlinedSelect from '../OutlinedSelect/OutlinedSelect'
import Typography from '../Typography'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export interface TablePaginationProps {
  pagination: {
    total: number
    page: number
    perPage: number
    actual: number
  }
  onChangePage: (page: number) => void
  onChangePerPage: (perPage: number) => void
  entityName: string
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  pagination,
  onChangePerPage,
  onChangePage,
  entityName,
}) => {
  const { perPage, page, actual, total } = pagination
  const start = (page - 1) * perPage + 1
  const end = start + actual - 1
  const lastPage = Math.ceil(total / perPage)
  return (
    <View
      style={{
        gap: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <View style={{ width: 50 }}>
        <OutlinedSelect option={perPage} options={[5, 10, 15, 20]} setOption={onChangePerPage} />
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
            onChangePage(pagination.page - 1)
          }}
          name="chevron-back-outline"
          color={page === 1 ? Colors.gray[400] : Colors.gray[800]}
          size={30}
          style={{ backgroundColor: Colors.gray[200], padding: 5, borderRadius: 999999 }}
        />
        <Ionicons
          onPress={() => {
            if (page === lastPage) return
            onChangePage(page + 1)
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
