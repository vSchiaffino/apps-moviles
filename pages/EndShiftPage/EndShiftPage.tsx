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
import { router, useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'

const EndShiftPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(undefined)
  const defaultPagination = { page: 1, limit: 999 }
  const defaultSort: Sort = { field: 'name', direction: 'ASC' }
  const { warehouses, total } = useWarehouses(defaultPagination, defaultSort)
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>()
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const { shift, start, end } = useShift()

  useEffect(() => {
    if (!selectedWarehouse && warehouses && warehouses.length > 0) {
      setSelectedWarehouse(warehouses[0])
    }
  }, [warehouses])

  const handleEndShift = () => {
    end()
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'dashboard' }] }))
    Alert.alert('Aviso', 'El turno se terminó correctamente', [
      {
        text: 'OK',
      },
    ])
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
                console.log(row.product)
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
              rows={selectedWarehouse?.stock}
            />
          )}
          <StyledButton label="Terminar turno" onPress={handleEndShift} />
        </View>
      </ScrollView>
    </Container>
  )
}

export default EndShiftPage
