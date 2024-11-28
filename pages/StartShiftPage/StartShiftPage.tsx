import { View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '@/components/Container'
import InfoCard from '@/components/InfoCard'
import { Spacing } from '@/constants/Spacing'
import { useWarehouses } from '@/hooks/useWarehouses'
import Sort from '@/models/Sort'
import OutlinedSelect from '@/components/OutlinedSelect/OutlinedSelect'
import Table from '@/components/Table/Table'
import warehouseService from '@/services/warehouse.service'
import { SetInitialModal } from './SetInitialModal'
import { useWarehouseDetail } from '@/hooks/useWarehouseDetail'
import useShift from '@/hooks/useShift'
import StyledButton from '@/components/StyledButton'
import Pagination from '@/models/Pagination'
import { router, useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'

const StartShiftPage = () => {
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const [selectedProduct, setSelectedProduct] = useState<any>(undefined)
  const defaultPagination = { page: 1, limit: 999 }
  const defaultSort: Sort = { field: 'name', direction: 'ASC' }
  const { warehouses, total } = useWarehouses(defaultPagination, defaultSort)
  const [pagination, setPagination] = React.useState<Pagination>({ page: 1, limit: 5 })
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>()
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    console.log('useEffect')
    if (!selectedWarehouse && warehouses && warehouses.length > 0) {
      setSelectedWarehouse(warehouses[0])
    }
  }, [warehouses])
  const { shift, start, end } = useShift()

  //TODO: erase this when initial stock assignation is done
  var [result, setResult] = useState<Array<any>>([])

  const handleSubmit = (product: any, iniStock: number) => {
    result.push({ product, iniStock })
  }

  const handleStartShift = () => {
    if (result.length === 0)
      Alert.alert('Aviso', 'Indicá los stocks iniciales para cada producto', [
        {
          text: 'OK',
        },
      ])
    console.log(result)
    start()
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'dashboard' }] }))
    Alert.alert('Aviso', 'El turno se inició correctamente', [
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
            <SetInitialModal
              selectedProduct={selectedProduct}
              setShow={setShowModal}
              show={showModal}
              onSubmit={async (form: any) => {
                const { quantity } = form
                //TODO: set initial stock of selectedProduct
                //Make sure initial stock doesnt exceed actual stock or equals zero
                handleSubmit(selectedProduct, quantity)
                setShowModal(false)
              }}
            />
          )}
          {selectedWarehouse === undefined && (
            <InfoCard infoText="Seleccioná un depósito para comenzar el turno" />
          )}
          <OutlinedSelect
            label="Seleccioná un depósito"
            options={warehouses}
            option={selectedWarehouse}
            renderOption={(option) => option.name}
            setOption={(option) => setSelectedWarehouse(option)}
          />
          {selectedWarehouse !== undefined && (
            <>
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
                    title: 'Inicial',
                    getValue: (row) => 0, //should be equal to initial stock
                    width: '30%',
                    align: 'flex-end',
                  },
                ]}
                rows={selectedWarehouse?.stock}
              />
              <StyledButton label="Iniciar turno" onPress={handleStartShift} />
            </>
          )}
        </View>
      </ScrollView>
    </Container>
  )
}

export default StartShiftPage
