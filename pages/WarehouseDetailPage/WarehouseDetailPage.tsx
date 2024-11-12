import { View } from 'react-native'
import React from 'react'
import { useWarehouseDetail } from '@/hooks/useWarehouseDetail'
import { Spacing } from '@/constants/Spacing'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'
import Table from '@/components/Table/Table'
import { AddStockModal } from './AddStockModal'
import useProducts from '@/hooks/useProducts'
import warehouseService from '@/services/warehouse.service'
import { useRoute } from '@react-navigation/native'
import IconButton from '@/components/IconButton'

const WarehouseDetailPage = () => {
  const {
    params: { id },
  }: any = useRoute()
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
        <Container style={{ gap: Spacing.rowGap, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" style={{ alignSelf: 'flex-end' }}>
              En stock:
            </Typography>
            <IconButton
              style={{ padding: 8 }}
              color={Colors.gray[100]}
              icon="add-outline"
              size={42}
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

export default WarehouseDetailPage
