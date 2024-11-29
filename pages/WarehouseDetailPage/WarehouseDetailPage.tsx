import { Alert, View } from 'react-native'
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
import InfoCard from '@/components/InfoCard'
import { router } from 'expo-router'
import useShift from '@/hooks/useShift'
import { SetEgressModal } from './SetEgressModal'

const WarehouseDetailPage = () => {
  const {
    params: { id },
  }: any = useRoute()

  const { products } = useProducts({ page: 1, limit: 999 }, { field: 'name', direction: 'DESC' })
  const { warehouse, refetch } = useWarehouseDetail(+id)
  const [showModal, setShowModal] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null)
  const { shift } = useShift()

  const noProducts = products === undefined || products.length === 0
  const message = noProducts ? 'Añadí productos aquí' : 'Tocá el botón de arriba para añadir stock'

  const setEgress = (warehouseId: number, productId: number, quantity: number) => {
    console.log({ warehouseId: warehouseId, productId: productId, quantity: quantity })
  }

  return (
    warehouse && (
      <Container style={{ gap: Spacing.rowGap, paddingHorizontal: 16 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 15, marginTop: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {showModal && !shift ? (
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
          ) : (
            <SetEgressModal
              selectedProduct={selectedProduct}
              products={products}
              setShow={setShowModal}
              show={showModal}
              onSubmit={async (form: any) => {
                const { quantity } = form
                setEgress(warehouse.id, selectedProduct.id, quantity) //implement egress
                setShowModal(false)
              }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingTop: 10,
            }}
          >
            <Typography variant="h5">Productos en stock</Typography>
            <IconButton
              disabled={shift}
              icon="add-circle-outline"
              size={24}
              style={{ backgroundColor: 'transparent' }}
              onPress={() => {
                if (!shift) {
                  noProducts ? router.push('/products') : setSelectedProduct(null)
                  setShowModal(true)
                } else {
                  Alert.alert('No podés añadir stock cuando hay un turno activo')
                }
              }}
            />
          </View>
          {warehouse.stock.length !== 0 ? (
            <Table
              headerFont="geist"
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
                  align: 'flex-start',
                },
                {
                  key: 'quantity',
                  title: 'Cantidad',
                  width: '30%',
                  align: 'flex-end',
                },
              ]}
            />
          ) : (
            <InfoCard infoText={'El depósito no tiene productos. ' + message} />
          )}
        </ScrollView>
      </Container>
    )
  )
}

export default WarehouseDetailPage
