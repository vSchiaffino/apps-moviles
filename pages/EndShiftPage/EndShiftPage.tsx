import { View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
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
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(warehouses?.first)
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const { shift, start, end } = useShift()

  //TODO: erase this when final stock assignation is done
  var [result, setResult] = useState<Array<any>>([])

  const handleSubmit = (product: any, finStock: number) => {
    result.push({ product, finStock })
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
                //TODO: set final stock of selectedProduct
                //Make sure final stock doesnt exceed initial or actual stock
                handleSubmit(selectedProduct, quantity)
                setShowModal(false)
              }}
            />
          )}
          {selectedWarehouse === undefined && (
            <InfoCard infoText="Seleccioná un depósito para terminar el turno" />
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
                    title: 'Final',
                    getValue: (row) => 0, //should be equal to final stock
                    width: '30%',
                    align: 'flex-end',
                  },
                ]}
                rows={selectedWarehouse?.stock}
              />
              <StyledButton
                label="Terminar turno"
                onPress={() => {
                  result.length === 0
                    ? alert('Indicá los stocks finales para cada producto')
                    : console.log(result)
                  end()
                  navigation.dispatch(
                    CommonActions.reset({ index: 0, routes: [{ name: 'dashboard' }] }),
                  )
                  Alert.alert('Aviso', 'El turno se terminó correctamente', [
                    {
                      text: 'OK',
                    },
                  ])
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </Container>
  )
}

export default EndShiftPage
