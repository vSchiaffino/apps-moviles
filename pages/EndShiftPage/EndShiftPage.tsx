import { View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '@/components/Container'
import InfoCard from '@/components/InfoCard'
import { Spacing } from '@/constants/Spacing'
import { useWarehouses } from '@/hooks/useWarehouses'
import Sort from '@/models/Sort'
import OutlinedSelect from '@/components/OutlinedSelect/OutlinedSelect'
import Table from '@/components/Table/Table'
import { SetEndModal } from './SetEndModal'
import useShift from '@/hooks/useShift'
import StyledButton from '@/components/StyledButton'
import { useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'

const EndShiftPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(undefined)
  const defaultPagination = { page: 1, limit: 999 }
  const defaultSort: Sort = { field: 'name', direction: 'ASC' }
  const { warehouses } = useWarehouses(defaultPagination, defaultSort)
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>()
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const [stocksArray, setStocksArray] = useState(warehouses)

  const { end } = useShift()

  useEffect(() => {
    if (!stocksArray && !selectedWarehouse && warehouses && warehouses.length > 0) {
      setSelectedWarehouse(warehouses[0])
      setStocksArray(
        warehouses?.map((warehouse: any) => ({
          warehouseId: warehouse.id,
          stock: warehouse.stock,
        })),
      )
    }
  }, [warehouses])

  const handleEndShift = () => {
    end(stocksArray)
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'dashboard' }] }))
    Alert.alert('Aviso', 'El turno se terminó correctamente', [
      {
        text: 'OK',
      },
    ])
  }

  const updateStockArray = (warehouseId: number, productId: number, newQuantity: number) => {
    setStocksArray((prevStocksArray: any) =>
      prevStocksArray.map((warehouse: any) => {
        if (warehouse.warehouseId === warehouseId) {
          return {
            ...warehouse,
            stock: warehouse.stock.map((stockItem: any) => {
              if (stockItem.product.id === productId) {
                return { ...stockItem, quantity: newQuantity }
              }
              return stockItem
            }),
          }
        }
        return warehouse
      }),
    )
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
        <View style={{ gap: Spacing.rowGap, padding: 16, paddingTop: 30 }}>
          {showModal && (
            <SetEndModal
              selectedProduct={selectedProduct}
              setShow={setShowModal}
              show={showModal}
              onSubmit={async (form: any) => {
                const { quantity } = form
                updateStockArray(selectedWarehouse.id, selectedProduct.id, quantity)
                setShowModal(false)
              }}
            />
          )}
          <InfoCard infoText="Registrá stocks finales para terminar el turno" />
          <OutlinedSelect
            label="Seleccioná un depósito"
            options={warehouses}
            option={selectedWarehouse}
            renderOption={(option) => option.name}
            setOption={(option) => setSelectedWarehouse(option)}
          />
          {selectedWarehouse !== undefined && (
            <Table
              headerFont="geist"
              onClickRow={(row) => {
                setShowModal(true)
                setSelectedProduct(row.product)
              }}
              columns={[
                {
                  key: 'name',
                  title: 'Nombre',
                  width: '70%',
                  getValue: (row) => row.product.name,
                  align: 'flex-start',
                },
                {
                  key: 'quantity',
                  title: 'Final',
                  getValue: (row) => row.quantity,
                  width: '30%',
                  align: 'flex-end',
                },
              ]}
              rows={
                stocksArray.find((item: any) => item.warehouseId === selectedWarehouse.id)?.stock
              }
            />
          )}
          <StyledButton label="Terminar turno" onPress={handleEndShift} />
        </View>
      </ScrollView>
    </Container>
  )
}

export default EndShiftPage
