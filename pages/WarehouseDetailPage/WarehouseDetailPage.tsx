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

const WarehouesDetailPage = () => {
  const { id } = useLocalSearchParams()
  const { warehouse, refetch } = useWarehouseDetail(+id)

  return (
    warehouse && (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.gray[100], marginTop: Spacing.rowGap }}
      >
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
            <AddButton label="Ingresar" />
          </View>
          <Table
            rows={warehouse.stock}
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
