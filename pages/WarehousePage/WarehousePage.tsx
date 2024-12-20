import { Alert, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import Container from '@/components/Container'
import { Spacing } from '@/constants/Spacing'
import WarehouseTable from './WarehouseTable/WarehouseTable'
import WarehouseCard from '@/components/WarehouseCard'
import { useWarehouses } from '@/hooks/useWarehouses'
import WarehouseModal from './WarehouseModal'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import TransferWarehouseModal from './WarehouseTransferModal'
import { router, useNavigation } from 'expo-router'
import ActionsList from '@/components/ActionsList'
import InfoCard from '@/components/InfoCard'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useShift from '@/hooks/useShift'

export type WarehouseStackParamList = {
  'warehouse-page': undefined
  'warehouse-detail': { id: number; name: string }
}
export type WarehouseNavigationProp = NativeStackNavigationProp<WarehouseStackParamList>

const WarehousePage = () => {
  const { navigate } = useNavigation<WarehouseNavigationProp>()
  const [pagination, setPagination] = React.useState<Pagination>({ page: 1, limit: 5 })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { warehouses, create, total, edit, transfer, refetch, remove } = useWarehouses(
    pagination,
    sort,
  )
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null)
  const [selectedRow, setSelectedRow] = useState<any>(undefined)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [cardList, setCardList] = useState(true)

  const { shift } = useShift()

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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ height: '100%' }}
          contentContainerStyle={{ paddingBottom: 250 }}
        >
          <ActionsList
            isRowSelected={selectedRow}
            mainIcons={[
              {
                icon: 'add-circle-outline',
                onPress: () => {
                  if (!shift) {
                    setEditingWarehouse(null)
                    setShowSaveModal(true)
                  } else {
                    Alert.alert(
                      'Turno activo',
                      'No podés agregar depósitos mientras un turno está activo',
                    )
                  }
                },
                disabled: shift,
              },
              {
                icon: 'compare-arrows',
                onPress: () => {
                  if (!shift) {
                    setShowTransferModal(true)
                  } else {
                    Alert.alert(
                      'Turno activo',
                      'No podés transferir productos mientras un turno está activo',
                    )
                  }
                },
                library: 'mui',
                disabled: shift,
              },
              {
                icon: !cardList ? 'grid-outline' : 'list-outline',
                onPress: () => toggleView(),
              },
            ]}
            additionalIcons={[
              {
                icon: 'create-outline',
                onPress: () => {
                  if (!shift) {
                    setEditingWarehouse(selectedRow)
                    setShowSaveModal(true)
                    setSelectedRow(undefined)
                  } else {
                    Alert.alert(
                      'Turno activo',
                      'No podés editar un depósito mientras un turno está activo',
                    )
                  }
                },
                disabled: shift,
              },
              {
                icon: 'trash-outline',
                onPress: () => {
                  if (!shift) {
                    setSelectedRow(undefined)
                    remove(selectedRow.id)
                  } else {
                    Alert.alert(
                      'Turno activo',
                      'No podés eliminar un depósito mientras un turno está activo',
                    )
                  }
                },
                disabled: shift,
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
              {warehouses.length !== 0 ? (
                <WarehouseTable
                  selectedRow={selectedRow}
                  pagination={pagination}
                  setPagination={setPagination}
                  total={total}
                  warehouses={warehouses}
                  sort={sort}
                  setSort={setSort}
                  onPressRow={(row: any) => {
                    if (selectedRow === undefined) {
                      router.push({ pathname: '/warehouse/[id]', params: { id: row.id as number } })
                    } else {
                      setSelectedRow(undefined)
                    }
                  }}
                  onLongPressRow={(row: any) => {
                    selectedRow !== undefined && selectedRow.id !== row.id
                      ? setSelectedRow(row)
                      : selectedRow === undefined
                        ? setSelectedRow(row)
                        : setSelectedRow(undefined)
                  }}
                />
              ) : (
                <InfoCard infoText="No tenés depósitos. Tocá el botón de arriba para añadir uno" />
              )}
            </View>
          )}
        </ScrollView>
      </Container>
    )
  )
}

export default WarehousePage
