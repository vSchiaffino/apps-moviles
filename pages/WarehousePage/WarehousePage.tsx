import { ScrollView, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import Container from '@/components/Container'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'
import WarehouseTable from './WarehouseTable/WarehouseTable'
import WarehouseCard from '@/components/WarehouseCard'
import { Ionicons } from '@expo/vector-icons'
import AddButton from '@/components/AddButton'
import { useWarehouses } from '@/hooks/useWarehouses'

const WarehousePage = () => {
  const { warehouses } = useWarehouses()
  const [cardList, setCardList] = useState(false)
  function toggleView() {
    setCardList((prev) => !prev)
  }

  return (
    warehouses && (
      <Container>
        <ScrollView style={{ backgroundColor: Colors.gray[100], marginTop: Spacing.rowGap }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h4" style={{ marginBottom: Spacing.rowGap }}>
              Depositos
            </Typography>
            <TouchableHighlight
              underlayColor={'rgba(1,1,1,0.05)'}
              style={{ borderRadius: 999, padding: 10 }}
              onPress={() => toggleView()}
              hitSlop={20}
            >
              {cardList ? (
                <Ionicons name="list-outline" size={24} color="grey" />
              ) : (
                <Ionicons name="grid-outline" size={24} color="grey" />
              )}
            </TouchableHighlight>
            <AddButton onPress={() => console.log('TODO')} />
          </View>
          {cardList ? (
            <View style={{ flexDirection: 'column', rowGap: 20 }}>
              {warehouses.map((warehouse) => (
                <WarehouseCard item={warehouse} key={warehouse.id} />
              ))}
            </View>
          ) : (
            <WarehouseTable items={warehouses} />
          )}
        </ScrollView>
      </Container>
    )
  )
}

export default WarehousePage
