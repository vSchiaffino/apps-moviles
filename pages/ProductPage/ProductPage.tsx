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
import IconButton from '@/components/IconButton'
import IconList from '../IconList'

const ProductsPage = () => {
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    limit: 5,
  })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { products, total, create, edit } = useProducts(pagination, sort)
  const [showModal, setShowModal] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<any>(null)
  return (
    <Container>
      {showModal && (
        <ProductModal
          onSubmit={async (form: any) => {
            if (editingProduct) {
              await edit(editingProduct.id, form)
            } else {
              await create(form)
            }
            setShowModal(false)
            setEditingProduct(null)
          }}
          setShow={setShowModal}
          show={showModal}
          product={editingProduct}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.gray[100], height: '100%' }}
      >
        <View style={{ padding: 16 }}>
          <IconList
            icons={[
              {
                icon: 'add-circle-outline',
                onPress: () => {
                  setEditingProduct(null)
                  setShowModal(true)
                },
              },
            ]}
          />

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
        </View>
      </ScrollView>
    </Container>
  )
}

export default ProductsPage
