import AddButton from '@/components/AddButton'
import Container from '@/components/Container'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React from 'react'
import ProductModal from './ProductModal'
import ProductTable from './ProductTable'
import useProducts from '@/hooks/useProducts'

const ProductsPage = () => {
  const { products } = useProducts()
  const [showModal, setShowModal] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<any>(null)
  return (
    <Container>
      {showModal && (
        <ProductModal
          onSubmit={async () => {
            setShowModal(false)
          }}
          setShow={setShowModal}
          show={showModal}
          product={editingProduct}
        />
      )}
      <ScrollView style={{ backgroundColor: Colors.gray[100], marginTop: Spacing.rowGap }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: Spacing.rowGap,
          }}
        >
          <View style={{ height: 'auto' }}>
            <Typography variant="h4">Productos</Typography>
          </View>
          <AddButton
            onPress={() => {
              setEditingProduct(null)
              setShowModal(true)
            }}
          />
        </View>
        <ProductTable
          items={products}
          onClickRow={(row: any) => {
            setEditingProduct(row)
            setShowModal(true)
          }}
        />
      </ScrollView>
    </Container>
  )
}

export default ProductsPage
