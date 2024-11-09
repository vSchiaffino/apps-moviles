import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import Container from '@/components/Container'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'
import WarehouseTable from './WarehouseTable/WarehouseTable'

const WarehousePage = () => {
  const [view, setView] = useState(false)
  function toggleView() {
    setView((prev) => !prev)
  }
  const warehouses = [
    {
      id: 1,
      name: 'Depósito A',
      location: 'Alicia Moreau de Justo 1189',
      stock: 160,
      capacity: 165,
    },
    {
      id: 2,
      name: 'Depósito B',
      location: 'Alicia Moreau de Justo 1189',
      stock: 0,
      capacity: 165,
    },
    {
      id: 3,
      name: 'Depósito C',
      location: 'Alicia Moreau de Justo 1189',
      stock: 165,
      capacity: 165,
    },
  ]

  return (
    <Container>
      <ScrollView style={{ backgroundColor: Colors.gray[100], marginTop: Spacing.rowGap }}>
        <Typography variant="h4" style={{ marginBottom: Spacing.rowGap }}>
          Depositos
        </Typography>
        <WarehouseTable items={warehouses} />
      </ScrollView>
    </Container>
  )
}

export default WarehousePage
