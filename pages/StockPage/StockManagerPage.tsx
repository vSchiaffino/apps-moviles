import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import DateSelect from '@/components/DateSelect'
import StyledButton from '@/components/StyledButton'
import SelectDateModal from './SelectDateModal'
import StockSummaryTable from './StockSummaryTable'
import EditStockModal from './EditStockModal'
import useStockLevel from '@/hooks/useStockLevel'
import InfoCard from '@/components/InfoCard'
import { Spacing } from '@/constants/Spacing'
import { router } from 'expo-router'

const StockManagerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [modalDateVisible, setModalDateVisible] = useState(false)
  const [stockSelectedIndex, setStockSelectedIndex] = useState<number | null>(null)
  const [selectedRow, setSelectedRow] = useState<any | null>(null)
  const { save, editingStockLevel, setEditing, isEditing, message } = useStockLevel(selectedDate)

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          padding: 16,
          paddingBottom: 120,
          gap: Spacing.rowGap,
        }}
      >
        <DateSelect
          label="Fecha del resumen"
          value={selectedDate}
          onChange={setSelectedDate}
          onPressIcon={() => setModalDateVisible(true)}
        />
        <SelectDateModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          visible={modalDateVisible}
          setVisible={setModalDateVisible}
        />
        {editingStockLevel && (
          <>
            <View style={{ width: '100%' }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}
              >
                <Typography variant="h5" style={{ marginBottom: 10, alignContent: 'flex-end' }}>
                  {isEditing ? 'Editando' : 'Creando'} resumen de stock
                </Typography>
              </View>
              <StockSummaryTable
                rows={editingStockLevel as any}
                onClickRow={(row, index) => {
                  setStockSelectedIndex(index as number)
                  setSelectedRow(row)
                }}
              />
            </View>
            <StyledButton label="Confirmar stocks" onPress={save}></StyledButton>
          </>
        )}
        <EditStockModal
          shouldShowNext={editingStockLevel?.length !== (stockSelectedIndex as any) + 1}
          onNext={() => {
            setEditing((prev: any) => {
              const newRows = [...prev]
              newRows[stockSelectedIndex as number] = selectedRow
              return newRows
            })
            setStockSelectedIndex((prev) => (prev as number) + 1)
            setSelectedRow(editingStockLevel?.[(stockSelectedIndex as number) + 1])
          }}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setStockSelectedIndex={setStockSelectedIndex}
          onSubmit={() => {
            setEditing((prev: any) => {
              const newRows = [...prev]
              newRows[stockSelectedIndex as number] = selectedRow
              return newRows
            })
            setStockSelectedIndex(null)
            setSelectedRow(null)
          }}
        />
        {selectedDate && (
          <StyledButton
            label="Ver Resumen"
            onPress={() => router.push({ pathname: '/(tabs)/stock-manager/stock-summary' })}
          />
        )}
        {message && <InfoCard infoText="Registro de stock guardado" />}
      </ScrollView>
    </Container>
  )
}

export default StockManagerPage
