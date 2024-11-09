import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import Container from '@/components/Container'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import Table from '@/components/Table/Table'
import { Spacing } from '@/constants/Spacing'

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

const WarehousePage = () => {
  const [view, setView] = useState(false)
  function toggleView() {
    setView((prev) => !prev)
  }

  return (
    <Container>
      <ScrollView style={{ backgroundColor: Colors.gray[100], marginTop: Spacing.rowGap }}>
        <Typography variant="h4" style={{ marginBottom: Spacing.rowGap }}>
          Depositos
        </Typography>
        <Table
          headerFont="geist"
          columns={[
            { key: 'name', title: 'Nombre', width: '33.3%', align: 'flex-start' },
            {
              key: 'badge',
              title: 'Estado',
              width: '33.3%',
              align: 'center',
              render: (row: any) => {
                const full = row.stock / row.capacity >= 1
                const almostFull = row.stock / row.capacity >= 0.9 && !full
                return (
                  <Typography
                    key={row.id}
                    variant="mini"
                    justify="center"
                    style={{
                      backgroundColor: full
                        ? Colors.danger[100]
                        : almostFull
                          ? Colors.yellow[100]
                          : Colors.primary[200],
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 16,
                      width: 45,
                      color: full
                        ? Colors.danger[600]
                        : almostFull
                          ? Colors.yellow[600]
                          : Colors.primary[600],
                    }}
                  >
                    {full ? 'FULL' : almostFull ? 'AF' : 'OK'}
                  </Typography>
                )
              },
            },
            {
              key: 'stock',
              title: 'Capacidad',
              width: '33.3%',
              align: 'flex-end',
              render: ({ stock, capacity, state, row }: any) => {
                const colorSchemeByState = {
                  full: Colors.danger,
                  almostFull: Colors.yellow,
                  ok: Colors.gray,
                }
                const colorScheme = colorSchemeByState[state as 'full' | 'almostFull' | 'ok']
                const color = colorScheme[600]
                return (
                  <Typography key={row} variant="body" style={{ color }} justify="center">
                    {stock}
                    <Typography key={row} variant="mini" style={{ color }}>
                      {'/'}
                      {capacity}
                    </Typography>
                  </Typography>
                )
              },
            },
          ]}
          rows={warehouses.map((warehouse) => ({
            ...warehouse,
            state:
              warehouse.stock / warehouse.capacity >= 1
                ? 'full'
                : warehouse.stock / warehouse.capacity >= 0.9
                  ? 'almostFull'
                  : 'ok',
          }))}
        />
      </ScrollView>
    </Container>
  )
}

export default WarehousePage
