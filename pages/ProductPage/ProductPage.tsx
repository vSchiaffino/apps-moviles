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
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'

const ProductsPage = () => {
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    limit: 5,
  })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { products, total, create } = useProducts(pagination, sort)
  const [showModal, setShowModal] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<any>(null)
  return (
    <Container>
      {showModal && (
        <ProductModal
          onSubmit={async (form: any) => {
            await create(form)
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
          pagination={pagination}
          products={products}
          setPagination={setPagination}
          setSort={setSort}
          sort={sort}
          total={total}
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
