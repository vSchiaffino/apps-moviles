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

const WarehousePage = () => {
  const [pagination, setPagination] = React.useState<Pagination>({ page: 1, limit: 5 })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { warehouses, create, total, edit } = useWarehouses(pagination, sort)
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [cardList, setCardList] = useState(false)
  function toggleView() {
    setCardList((prev) => !prev)
  }

  return (
    warehouses && (
      <Container pageHeader="Depósitos">
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
          style={{ backgroundColor: Colors.gray[100], marginTop: Spacing.rowGap }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: Spacing.rowGap,
            }}
          >
            <TouchableHighlight
              underlayColor={'rgba(1,1,1,0.05)'}
              style={{
                borderRadius: 999,
                aspectRatio: 1 / 1,
                justifyContent: 'center',
                alignSelf: 'center',
                padding: 10,
              }}
              onPress={() => toggleView()}
              hitSlop={20}
            >
              {cardList ? (
                <Ionicons name="list-outline" size={24} color="grey" />
              ) : (
                <Ionicons name="grid-outline" size={24} color="grey" />
              )}
            </TouchableHighlight>
            <AddButton
              onPress={() => {
                setEditingWarehouse(null)
                setShowModal(true)
              }}
            />
          </View>
          {!cardList ? (
            <View style={{ flexDirection: 'column', rowGap: 20 }}>
              {warehouses.map((warehouse: any) => (
                <WarehouseCard item={warehouse} key={warehouse.id} />
              ))}
            </View>
          ) : (
            <WarehouseTable
              pagination={pagination}
              setPagination={setPagination}
              total={total}
              warehouses={warehouses}
              sort={sort}
              setSort={setSort}
              onClickRow={(row: any) => {
                setEditingWarehouse(row)
                setShowModal(true)
              }}
            />
          )}
        </ScrollView>
      </Container>
    )
  )
}

export default WarehousePage
