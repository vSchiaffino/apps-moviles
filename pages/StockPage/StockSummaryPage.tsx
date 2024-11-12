import React, { useState } from 'react'
import { View, FlatList, Pressable, Text, TextInput, StyleSheet } from 'react-native'
import IconButton from '@/components/IconButton'
import MutateEntityModal from '@/components/MutateEntityModal'
import Container from '@/components/Container'
import InfoCard from '@/components/InfoCard'

const StockSummaryPage = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'Producto A', quantity: 10 },
    { id: '2', name: 'Producto B', quantity: 20 },
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [stockData, setStockData] = useState<{
    [key: string]: { initial?: string; final?: string }
  }>({})
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleStockChange = (productId: string, field: string, value: string) => {
    setStockData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }))
  }

  const handleConfirmAndNext = () => {
    const currentProduct = items[currentProductIndex]
    setSelectedItems((prev) => [...prev, currentProduct.id])
    setCurrentProductIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % items.length
      return nextIndex
    })
    closeModal()
  }

  const handleAccept = () => {
    console.log('Datos de stock:', stockData)
  }

  const filteredItems = items.filter((item) => selectedItems.includes(item.id))

  return (
    <Container style={{ height: '100%' }}>
      <View
        style={{
          padding: 16,
          alignItems: 'center',
        }}
      >
        <View style={{ marginVertical: '10%' }}>
          <InfoCard
            infoText={
              'Agrega los productos y detalla el stock inicial y final para la fecha que seleccionaste.'
            }
          />
        </View>

        <IconButton size={32} icon="add-outline" color="white" onPress={openModal} />
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemStock}>
                Stock Inicial: {stockData[item.id]?.initial || '0'}
              </Text>
              <Text style={styles.itemStock}>Stock Final: {stockData[item.id]?.final || '0'}</Text>
            </View>
          )}
          ListFooterComponent={
            <Pressable style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.acceptButtonText}>Confirmar</Text>
            </Pressable>
          }
        />
        <MutateEntityModal show={modalVisible} setShow={setModalVisible} title="Modificar Stock">
          <View style={styles.productItem}>
            <Text style={styles.productName}>{items[currentProductIndex].name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Stock inicial"
              keyboardType="numeric"
              value={stockData[items[currentProductIndex].id]?.initial || ''}
              onChangeText={(text) =>
                handleStockChange(items[currentProductIndex].id, 'initial', text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Stock final"
              keyboardType="numeric"
              value={stockData[items[currentProductIndex].id]?.final || ''}
              onChangeText={(text) =>
                handleStockChange(items[currentProductIndex].id, 'final', text)
              }
            />
            <View style={styles.buttonContainer}>
              <IconButton
                onPress={handleConfirmAndNext}
                size={32}
                icon="checkmark-outline"
                color="white"
                style={styles.confirmButton}
              />
              <IconButton
                onPress={closeModal}
                size={32}
                icon="close-outline"
                color="white"
                style={styles.closeButton}
              />
            </View>
          </View>
        </MutateEntityModal>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemStock: {
    fontSize: 14,
    color: '#666',
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  confirmButton: {
    marginLeft: 8,
  },
  closeButton: {
    marginRight: 8,
  },
  acceptButton: {
    padding: 16,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginVertical: 24,
    borderRadius: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  productItem: {
    padding: 16,
    justifyContent: 'space-evenly',
    alignContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})

export default StockSummaryPage
