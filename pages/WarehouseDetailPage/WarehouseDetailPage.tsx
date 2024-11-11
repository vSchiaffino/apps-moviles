import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useWarehouseDetail } from '@/hooks/useWarehouseDetail'
import { Spacing } from '@/constants/Spacing'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'
import Table from '@/components/Table/Table'
import AddButton from '@/components/AddButton'
import { AddStockModal } from './AddStockModal'
import useProducts from '@/hooks/useProducts'
import warehouseService from '@/services/warehouse.service'

const WarehouesDetailPage = () => {
  const { id } = useLocalSearchParams()
  const { products } = useProducts({ page: 1, limit: 999 }, { field: 'name', direction: 'DESC' })
  const { warehouse, refetch } = useWarehouseDetail(+id)
  const [showModal, setShowModal] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null)
  return (
    warehouse && (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.gray[100], marginTop: Spacing.rowGap }}
      >
        {showModal && (
          <AddStockModal
            selectedProduct={selectedProduct}
            products={products}
            setShow={setShowModal}
            show={showModal}
            onSubmit={async (form: any) => {
              const { product, quantity } = form
              await warehouseService.addStock(+id, {
                productId: product.id,
                quantity: parseInt(quantity),
              })
              await refetch()
              setShowModal(false)
            }}
          />
        )}
        <Container style={{ gap: Spacing.rowGap }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: Spacing.rowGap,
            }}
          >
            <Typography variant="h4">Depósito "{warehouse.name}"</Typography>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h5">Productos:</Typography>
            <AddButton
              label="Ingresar"
              onPress={() => {
                setSelectedProduct(null)
                setShowModal(true)
              }}
            />
          </View>
          <Table
            rows={warehouse.stock}
            onClickRow={(row) => {
              setSelectedProduct(row.product)
              setShowModal(true)
            }}
            columns={[
              {
                key: 'name',
                title: 'Nombre',
                width: '70%',
                getValue: (row) => row.product.name,
              },
              {
                key: 'quantity',
                title: 'Cantidad',
                width: '30%',
              },
            ]}
          />
        </Container>
      </ScrollView>
    )
  )
}

export default WarehouesDetailPage
