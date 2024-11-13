import React, { useState } from 'react'
import { StyleSheet, View, Pressable, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import Typography from '@/components/Typography'
import IconSelect from '@/components/IconSelect'
import Container from '@/components/Container'
import { Calendar } from 'react-native-calendars'
import DateSelect from '@/components/DateSelect'
import StyledButton from '@/components/StyledButton'
import InfoCard from '@/components/InfoCard'
import { router } from 'expo-router'
import Table from '@/components/Table/Table'
import IconButton from '@/components/IconButton'
import { Colors } from '@/constants/Colors'
import OutlinedSelect from '@/components/OutlinedSelect/OutlinedSelect'
import OutlinedInput from '@/components/OutlinedInput'
import MutateEntityModal from '@/components/MutateEntityModal'

const StockManagerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [warehouse, setWarehouse] = useState('')
  const [modalDateVisible, setModalDateVisible] = useState(false)
  const [stockSelectedIndex, setStockSelectedIndex] = useState<number | null>(null)
  const [rows, setRows] = useState<any[]>([
    { product: 'Producto 1', initialStock: 20, finalStock: 10 },
    { product: 'Producto 2', initialStock: 10, finalStock: 5 },
    { product: 'Producto 3', initialStock: 15, finalStock: 20 },
  ])
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString)
    setModalDateVisible(false)
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          padding: 16,
          height: '100%',
        }}
      >
        {/* <InfoCard
          infoText={
            'Selecciona el deposito en el que quieras registrar cambios en el stock' +
            '\n' +
            'Luego selecciona la fecha y presiona "Siguiente" para continuar'
          }
        /> */}
        {/* <IconSelect
          icon="local-shipping"
          label="Depósito"
          options={['Depósito 1', 'Depósito 2', 'Depósito 3']}
          value={warehouse}
          onChange={setWarehouse}
        /> */}
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
            <IconButton
              style={{ padding: 8 }}
              color={Colors.gray[100]}
              icon="add-outline"
              size={42}
              onPress={() => {}}
            />
          </View>
          <Table
            sortingFields={[]}
            headerFont="geist"
            entityName="Productos"
            onClickRow={(row, index) => {
              if (index != null) setStockSelectedIndex(index)
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
          show={stockSelectedIndex !== null}
          setShow={() => setStockSelectedIndex(null)}
          title="Editar stock registrado"
        >
          {stockSelectedIndex !== null && (
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
                value={rows[stockSelectedIndex as any].initialStock}
                onChange={(e: any) => {
                  console.log('value', e.target.value)
                  rows[stockSelectedIndex as any].initialStock = e.target.value
                  setRows(rows)
                }}
              />
              <OutlinedInput
                label="Stock final"
                keyboardType="numeric"
                value={rows[stockSelectedIndex as any].finalStock}
                onChange={(e: any) => {
                  setRows((prev) => {
                    prev[stockSelectedIndex as any].finalStock = e.target.value
                    return prev
                  })
                }}
              />
              <StyledButton
                label="Salir"
                onPress={() => {
                  setStockSelectedIndex(null)
                }}
              ></StyledButton>
            </View>
          )}
        </MutateEntityModal>
        {/* <Table
          sortingFields={['name']}
          entityName="Productos"
          headerFont="geist"
          columns={[
            { key: 'name', title: 'Nombre', width: '75%', align: 'flex-start' },
            {
              key: 'stockNumber',
              title: 'Stock',
              width: '25%',
              align: 'center',
            },
          ]}
          rows={[
            { name: 'Producto 1', stockNumber: 20 },
            { name: 'Producto 2', stockNumber: 10 },
            { name: 'Producto 3', stockNumber: 15 },
          ]}
        /> */}
        <StyledButton
          label="Confirmar stocks"
          onPress={() => router.push('/stock-summary')}
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
