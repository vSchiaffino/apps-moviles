import Container from '@/components/Container'
import { Colors } from '@/constants/Colors'
import { Animated, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from 'react'
import ProductModal from './ProductModal'
import ProductTable from './ProductTable'
import useProducts from '@/hooks/useProducts'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import ActionsList from '@/components/ActionsList'
import InfoCard from '@/components/InfoCard'

const ProductsPage = () => {
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    limit: 5,
  })
  const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
  })
  const { products, total, create, edit, remove } = useProducts(pagination, sort)
  const [showModal, setShowModal] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<any>(null)

  const [selectedRow, setSelectedRow] = useState<any>(undefined)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [hasFadedIn, setHasFadedIn] = useState(true)

  useEffect(() => {
    if (hasFadedIn) {
      fadeAnim.setValue(0)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setHasFadedIn(true)
      })
    }
  }, [selectedRow])

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
        style={{ height: '100%' }}
        contentContainerStyle={{ paddingBottom: 250 }}
      >
        <ActionsList
          isRowSelected={selectedRow}
          onPressCreate={() => {
            setEditingProduct(null)
            setShowModal(true)
          }}
          onPressDelete={() => {
            setSelectedRow(undefined)
            remove(selectedRow.id)
          }}
          onPressEdit={() => {
            setEditingProduct(selectedRow)
            setShowModal(true)
            setSelectedRow(undefined)
          }}
        />
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          {products !== undefined && products.length !== 0 ? (
            <ProductTable
              onClickRow={() => {}}
              selectedRow={selectedRow}
              pagination={pagination}
              products={products}
              setPagination={setPagination}
              setSort={setSort}
              sort={sort}
              total={total}
              onLongPressRow={(row: any) => {
                selectedRow !== undefined && selectedRow.id !== row.id
                  ? setSelectedRow(row)
                  : selectedRow === undefined
                    ? setSelectedRow(row)
                    : setSelectedRow(undefined)
              }}
            />
          ) : (
            <InfoCard infoText="No tenés ningún producto. Tocá el botón de arriba para crear uno" />
          )}
        </View>
      </ScrollView>
    </Container>
  )
}

export default ProductsPage
