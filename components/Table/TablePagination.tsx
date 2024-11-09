import React from 'react'
import { View } from 'react-native'
import OutlinedSelect from '../OutlinedSelect/OutlinedSelect'
import Typography from '../Typography'
import { Ionicons } from '@expo/vector-icons'

export interface TablePaginationProps {
  pagination: {
    total: number
    page: number
    perPage: number
    actual: number
  }
  onChangePage: (page: number) => void
  onChangePerPage: (perPage: number) => void
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  pagination,
  onChangePerPage,
  onChangePage,
}) => {
  const { perPage } = pagination
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
          1-10
        </Typography>
        <Typography variant="body">Depósitos</Typography>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
        <Ionicons name="chevron-back-outline" size={30} />
        <Ionicons name="chevron-forward-outline" size={30} />
      </View>
    </View>
  )
}
