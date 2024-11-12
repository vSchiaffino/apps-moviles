import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import Container from '@/components/Container'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'
import WarehouseTable from './WarehouseTable/WarehouseTable'
import WarehouseCard from '@/components/WarehouseCard'
import { useWarehouses } from '@/hooks/useWarehouses'
import WarehouseModal from './WarehouseModal'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import IconList from '../IconList'
import TransferWarehouseModal from './WarehouseTransferModal'
import { WarehouseStackParamList } from '@/stacks/WarehouseStack'
import { useNavigation } from 'expo-router'
import { WarehouseNavigationProp } from '@/app/warehouse'

const WarehousePage = () => {
  const { navigate } = useNavigation<WarehouseNavigationProp>()
  const [pagination, setPagination] = React.useState<Pagination>({ page: 1, limit: 5 })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { warehouses, create, total, edit, transfer, refetch } = useWarehouses(pagination, sort)
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [cardList, setCardList] = useState(false)
  function toggleView() {
    setCardList((prev) => !prev)
  }

  return (
    warehouses && (
      <Container>
        {showTransferModal && (
          <TransferWarehouseModal
            show={showTransferModal}
            setShow={setShowTransferModal}
            onSubmit={async (form: any) => {
              await transfer(form)
              await refetch()
              setShowTransferModal(false)
            }}
          />
        )}
        {showSaveModal && (
          <WarehouseModal
            warehouse={editingWarehouse}
            show={showSaveModal}
            setShow={setShowSaveModal}
            onSubmit={async (form: any) => {
              if (editingWarehouse) {
                await edit(editingWarehouse.id, form)
              } else {
                await create(form)
              }
              setShowSaveModal(false)
              setEditingWarehouse(null)
            }}
          />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Colors.gray[100], height: '100%' }}
        >
          <IconList
            icons={[
              {
                icon: !cardList ? 'grid-outline' : 'list-outline',
                onPress: () => toggleView(),
              },
              {
                icon: 'add-circle-outline',
                onPress: () => {
                  setEditingWarehouse(null)
                  setShowSaveModal(true)
                },
              },
              {
                icon: 'compare-arrows',
                onPress: () => {
                  setShowTransferModal(true)
                },
                library: 'mui',
              },
            ]}
          />

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
                  console.log('id from onPressRow', row.id)
                  navigate('warehouse-detail', {
                    id: row.id,
                  })
                }}
                onLongPressRow={(row: any) => {
                  setEditingWarehouse(row)
                  setShowSaveModal(true)
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
