import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, ScrollView } from 'react-native'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import DateSelect from '@/components/DateSelect'
import StyledButton from '@/components/StyledButton'
import SelectDateModal from './SelectDateModal'
import StockSummaryTable from './StockSummaryTable'
import EditStockModal from './EditStockModal'
import useStockLevel from '@/hooks/useStockLevel'

const StockManagerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [modalDateVisible, setModalDateVisible] = useState(false)
  const [stockSelectedIndex, setStockSelectedIndex] = useState<number | null>(null)
  const [selectedRow, setSelectedRow] = useState<any | null>(null)
  const { stockLevels, save, editingStockLevel, setEditing, isEditing, message } =
    useStockLevel(selectedDate)

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          padding: 16,
        }}
      >
        <DateSelect
          label=""
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
      </ScrollView>
      {message && (
        <Typography
          variant="body"
          color="primary"
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          {message}
        </Typography>
      )}
    </Container>
  )
}

export default StockManagerPage
