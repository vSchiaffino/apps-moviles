import { ScrollView, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import Container from '@/components/Container'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'
import WarehouseTable from './WarehouseTable/WarehouseTable'
import WarehouseCard from '@/components/WarehouseCard'
import { Ionicons } from '@expo/vector-icons'
import AddButton from '@/components/AddButton'
import { useWarehouses } from '@/hooks/useWarehouses'
import WarehouseModal from './WarehouseModal'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import { router, useFocusEffect } from 'expo-router'
import IconButton from '@/components/IconButton'

const WarehousePage = () => {
  const [pagination, setPagination] = React.useState<Pagination>({ page: 1, limit: 5 })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { warehouses, create, total, edit, refetch } = useWarehouses(pagination, sort)
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [cardList, setCardList] = useState(false)
  useFocusEffect(() => {
    refetch()
  })
  function toggleView() {
    setCardList((prev) => !prev)
  }

  return (
    warehouses && (
      <Container>
        {showModal && (
          <WarehouseModal
            warehouse={editingWarehouse}
            show={showModal}
            setShow={setShowModal}
            onSubmit={async (form: any) => {
              if (editingWarehouse) {
                await edit(editingWarehouse.id, form)
              } else {
                await create(form)
              }
              setShowModal(false)
              setEditingWarehouse(null)
            }}
          />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Colors.gray[100], height: '100%' }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: Spacing.rowGap,
              padding: 16,
              paddingRight: 30,
            }}
          >
            <IconButton
              mode="opacity"
              color="rgba(1,1,1,0.7)"
              style={{ backgroundColor: 'transparent' }}
              icon={cardList ? 'list-outline' : 'grid-outline'}
              size={24}
              onPress={() => toggleView()}
              hitSlop={20}
            />
            <IconButton
              color="rgba(1,1,1,0.7)"
              mode="opacity"
              style={{ backgroundColor: 'transparent' }}
              onPress={() => {
                setEditingWarehouse(null)
                setShowModal(true)
              }}
              icon="add-circle-outline"
              size={24}
            />
            <IconButton
              color="rgba(1,1,1,0.7)"
              library="mui"
              mode="opacity"
              icon="compare-arrows"
              style={{ backgroundColor: 'transparent' }}
              size={26}
              onPress={() => router.navigate('/warehouseTransfer')}
            />
          </View>
          {!cardList ? (
            <View
              style={{
                flexDirection: 'column',
                rowGap: Spacing.rowGap,
                marginBottom: 75,
                padding: 16,
                paddingTop: 0,
              }}
            >
              {warehouses.map((warehouse: any) => (
                <WarehouseCard item={warehouse} key={warehouse.id} />
              ))}
            </View>
          ) : (
            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <WarehouseTable
                pagination={pagination}
                setPagination={setPagination}
                total={total}
                warehouses={warehouses}
                sort={sort}
                setSort={setSort}
                onPressRow={(row: any) => {
                  router.push({
                    pathname: '/warehouse-detail',
                    params: { id: row.id },
                  })
                }}
                onLongPressRow={(row: any) => {
                  setEditingWarehouse(row)
                  setShowModal(true)
                }}
              />
            </View>
          )}
        </ScrollView>
      </Container>
    )
  )
}

export default WarehousePage
