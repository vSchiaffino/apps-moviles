import { Animated, ScrollView, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
  const [selectedRow, setSelectedRow] = useState<any>(undefined)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [cardList, setCardList] = useState(false)
  function toggleView() {
    setCardList((prev) => !prev)
  }
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [hasFadedIn, setHasFadedIn] = useState(true)

  useEffect(() => {
    if (hasFadedIn) {
      fadeAnim.setValue(0)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setHasFadedIn(true)
      })
    }
  }, [selectedRow])

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
          contentContainerStyle={{ paddingBottom: 250 }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Animated.View style={{ opacity: fadeAnim }}>
              {selectedRow === undefined ? (
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
              ) : (
                <></>
              )}
              {selectedRow !== undefined ? (
                <IconList
                  icons={[
                    {
                      icon: 'create-outline',
                      onPress: () => {
                        setEditingWarehouse(selectedRow)
                        setShowSaveModal(true)
                        setSelectedRow(undefined)
                      },
                    },
                    {
                      icon: 'trash-outline',
                      onPress: () => {
                        //Handle delete row
                        setSelectedRow(undefined)
                      },
                    },
                  ]}
                />
              ) : (
                <></>
              )}
            </Animated.View>
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
                selectedRow={selectedRow}
                pagination={pagination}
                setPagination={setPagination}
                total={total}
                warehouses={warehouses}
                sort={sort}
                setSort={setSort}
                onPressRow={(row: any) => {
                  navigate('warehouse-detail', {
                    id: row.id,
                  })
                }}
                onLongPressRow={(row: any) => {
                  selectedRow !== undefined && selectedRow.id !== row.id
                    ? setSelectedRow(row)
                    : selectedRow === undefined
                      ? setSelectedRow(row)
                      : setSelectedRow(undefined)
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
