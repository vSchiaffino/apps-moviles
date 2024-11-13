import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Pressable, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import { Calendar } from 'react-native-calendars'
import DateSelect from '@/components/DateSelect'
import StyledButton from '@/components/StyledButton'
import Table from '@/components/Table/Table'
import OutlinedInput from '@/components/OutlinedInput'
import MutateEntityModal from '@/components/MutateEntityModal'
import useProducts from '@/hooks/useProducts'

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
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString)
    setModalDateVisible(false)
  }
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
          <Table
            sortingFields={[]}
            headerFont="geist"
            entityName="Productos"
            onClickRow={(row, index) => {
              if (index != null) {
                setStockSelectedIndex(index)
                setSelectedRow(row)
              }
            }}
            columns={[
              { key: 'product', title: 'Producto', width: '40%', align: 'flex-start' },
              { key: 'initialStock', title: 'Stock inicial', width: '30%', align: 'center' },
              { key: 'finalStock', title: 'Stock final', width: '30%', align: 'center' },
            ]}
            rows={rows}
            pagination={{ page: 1, limit: 10, total: 3 }}
          />
        </View>
        <Modal
          isVisible={modalDateVisible}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          useNativeDriverForBackdrop={true}
          backdropOpacity={0.7}
          hasBackdrop={true}
          onBackdropPress={() => setModalDateVisible(false)}
          onBackButtonPress={() => setModalDateVisible(false)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              backgroundColor: 'white',
              backfaceVisibility: 'hidden',
            }}
          >
            <Calendar
              style={{ backgroundColor: 'transparent' }}
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
              }}
              monthFormat={'yyyy MMMM'}
            />
            <Pressable onPress={() => setModalDateVisible(false)} style={styles.closeButton}>
              <Typography variant="h6" style={{ color: 'white' }}>
                Cerrar
              </Typography>
            </Pressable>
          </View>
        </Modal>
        <MutateEntityModal
          show={selectedRow !== null}
          setShow={() => {
            setSelectedRow(null)
            setStockSelectedIndex(null)
          }}
          title="Editar stock registrado"
        >
          {selectedRow !== null && (
            <View
              style={{
                gap: 20,
                padding: 20,
                borderRadius: 16,
                backgroundColor: 'white',
                backfaceVisibility: 'hidden',
              }}
            >
              <OutlinedInput
                label="Stock Inicial"
                keyboardType="numeric"
                value={selectedRow.initialStock}
                onChangeText={(value: any) => {
                  setSelectedRow({ ...selectedRow, initialStock: value })
                }}
              />
              <OutlinedInput
                label="Stock final"
                keyboardType="numeric"
                value={selectedRow.finalStock}
                onChangeText={(value: any) => {
                  setSelectedRow({ ...selectedRow, finalStock: value })
                }}
              />
              <StyledButton
                label="Guardar"
                onPress={() => {
                  setRows((prev) => {
                    const newRows = [...prev]
                    newRows[stockSelectedIndex as number] = selectedRow
                    return newRows
                  })
                  setStockSelectedIndex(null)
                  setSelectedRow(null)
                }}
              ></StyledButton>
            </View>
          )}
        </MutateEntityModal>
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
