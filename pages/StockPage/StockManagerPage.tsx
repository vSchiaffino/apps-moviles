import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, ScrollView } from 'react-native'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import { Calendar } from 'react-native-calendars'
import DateSelect from '@/components/DateSelect'
import StyledButton from '@/components/StyledButton'
import Table from '@/components/Table/Table'
import OutlinedInput from '@/components/OutlinedInput'
import MutateEntityModal from '@/components/MutateEntityModal'
import useProducts from '@/hooks/useProducts'
import SelectDateModal from './SelectDateModal'
import StockSummaryTable from './StockSummaryTable'
import EditStockModal from './EditStockModal'

const StockManagerPage: React.FC = () => {
  const { products } = useProducts({ page: 1, limit: 100 }, { field: 'name', direction: 'ASC' })
  const [rows, setRows] = useState<any[]>([])
  useEffect(() => {
    console.log(products)
    if (!products) return

    const newRows = products.map((product: any) => ({
      id: product.id,
      product: product.name,
      initialStock: '0',
      finalStock: '0',
    }))

    setRows((prevRows: any[]) => {
      const prevIds = prevRows.map((row: any) => row.id)
      const newIds = newRows.map((row: any) => row.id)
      if (JSON.stringify(prevIds) === JSON.stringify(newIds)) {
        return prevRows
      }
      return newRows
    })
  }, [products])
  const [selectedDate, setSelectedDate] = useState('')
  const [modalDateVisible, setModalDateVisible] = useState(false)
  const [stockSelectedIndex, setStockSelectedIndex] = useState<number | null>(null)
  const [selectedRow, setSelectedRow] = useState<any | null>(null)

  console.log('selectedDate', selectedDate)
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
              Resumen de stock
            </Typography>
          </View>
          <StockSummaryTable
            rows={rows}
            onClickRow={(row, index) => {
              setStockSelectedIndex(index as number)
              setSelectedRow(row)
            }}
          />
        </View>
        <EditStockModal
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setStockSelectedIndex={setStockSelectedIndex}
          onSubmit={() => {
            setRows((prev) => {
              const newRows = [...prev]
              newRows[stockSelectedIndex as number] = selectedRow
              return newRows
            })
            setStockSelectedIndex(null)
            setSelectedRow(null)
          }}
        />
        <StyledButton
          label="Confirmar stocks"
          onPress={() => {
            // handle api connection
            rows.forEach((row) => {
              console.log({ date: selectedDate, row })
            })
          }}
        ></StyledButton>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {},
  header: {
    marginLeft: 8,
    textAlign: 'center',
  },
  selectContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
})

export default StockManagerPage
