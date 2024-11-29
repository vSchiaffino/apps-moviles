import Container from '@/components/Container'
import { Animated, Pressable, ScrollView, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Pagination from '@/models/Pagination'
import Sort from '@/models/Sort'
import InfoCard from '@/components/InfoCard'
import EgressTable from './EgressTable'
import StyledButton from '@/components/StyledButton'
import { router } from 'expo-router'
import { Spacing } from '@/constants/Spacing'

const EgressPage = () => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 5,
  })
  const [sort, setSort] = useState<Sort>({
    field: 'warehouseName',
    direction: 'ASC',
  })
  const [selectedRow, setSelectedRow] = useState<any>(undefined)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [hasFadedIn, setHasFadedIn] = useState(true)

  const sales = [
    {
      id: 1,
      product: { name: 'Cerveza' },
      warehouse: { name: 'Barra Principal' },
      quantity: 50,
    },
    {
      id: 2,
      product: { name: 'Vodka' },
      warehouse: { name: 'Almacén Secundario' },
      quantity: 30,
    },
    {
      id: 3,
      product: { name: 'Whisky' },
      warehouse: { name: 'Barra Principal' },
      quantity: 20,
    },
    {
      id: 4,
      product: { name: 'Gin Tonic' },
      warehouse: { name: 'Almacén Secundario' },
      quantity: 15,
    },
    {
      id: 5,
      product: { name: 'Producto1' },
      warehouse: { name: 'Barra1' },
      quantity: 40,
    },
    {
      id: 6,
      product: { name: 'Producto2' },
      warehouse: { name: 'Barra2' },
      quantity: 40,
    },
    {
      id: 7,
      product: { name: 'Producto3' },
      warehouse: { name: 'Barra3' },
      quantity: 40,
    },
  ]

  const flattenedSales = sales.map((sale) => ({
    ...sale,
    productName: sale.product.name,
    warehouseName: sale.warehouse.name,
  }))

  const total = flattenedSales.length

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

  function handleSubmit(): void {
    console.log('Turno Terminado IMPLEMENTAR')
    router.push('/(tabs)/dashboard/endshift')
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: '100%' }}
        contentContainerStyle={{ paddingBottom: 250 }}
      >
        <View style={{ padding: 16, gap: Spacing.rowGap }}>
          {flattenedSales && flattenedSales.length !== 0 ? (
            <>
              <EgressTable
                onClickRow={() => {}}
                selectedRow={selectedRow}
                pagination={pagination}
                sales={flattenedSales.slice(
                  (pagination.page - 1) * pagination.limit,
                  pagination.page * pagination.limit,
                )}
                setPagination={setPagination}
                setSort={setSort}
                sort={sort}
                total={total}
                onLongPressRow={() => {}}
              />
              <StyledButton label="Cerrar turno" onPress={handleSubmit} />
            </>
          ) : (
            <Pressable onPress={() => router.push('/warehouse')}>
              <InfoCard infoText="No hay egresos registrados. Empezá a registar egresos en la pantalla de depósitos tocando aquí" />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </Container>
  )
}

export default EgressPage
