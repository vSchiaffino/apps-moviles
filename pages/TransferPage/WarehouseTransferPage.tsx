import React, { useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import Typography from '@/components/Typography'
import { MaterialIcons } from '@expo/vector-icons'
import IconSelect from '@/components/IconSelect'
import TransferDetailsModal from '@/pages/TransferPage/TransferDetailsModal'
import Container from '@/components/Container'
import { ScrollView } from 'react-native-gesture-handler'
import { Spacing } from '@/constants/Spacing'
interface Product {
  name: string
  stock: number
}

const products: Product[] = [
  { name: 'Product 1', stock: 10 },
  { name: 'Product 2', stock: 20 },
  { name: 'Product 3', stock: 30 },
  { name: 'Product 4', stock: 40 },
  { name: 'Product 5', stock: 50 },
]

const WarehouseTransferPage: React.FC = () => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleSubmit = () => {
    setModalVisible(true)
  }

  const handleProductChange = (productName: string) => {
    const product = products.find((p) => p.name === productName) || null
    setSelectedProduct(product)
  }

  return (
    <Container style={{ justifyContent: 'center', gap: 10 }}>
      <View style={styles.headerContainer}>
        <MaterialIcons name="inventory" size={24} color="#007bff" />
        <Typography variant="h4" style={styles.header}>
          Transferencias
        </Typography>
      </View>
      <View style={styles.selectContainer}>
        <IconSelect
          icon="category"
          label="Productos"
          options={products.map((p) => p.name)}
          value={selectedProduct?.name || ''}
          onChange={handleProductChange}
        />
        <IconSelect
          icon="store"
          label="Origen"
          options={['Deposito 1', 'Deposito 2', 'Deposito 3']}
          value={origin}
          onChange={setOrigin}
        />
        <IconSelect
          icon="local-shipping"
          label="Destino"
          options={['Deposito 1', 'Deposito 2', 'Deposito 3']}
          value={destination}
          onChange={setDestination}
        />
      </View>
      <TransferDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct ? selectedProduct.name : ''}
        origin={origin}
        destination={destination}
        stock={selectedProduct ? selectedProduct.stock : 0}
      />
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <MaterialIcons name="send" size={20} color="#fff" />
        <Typography variant="h6" style={styles.submitButtonText}>
          Transferir
        </Typography>
      </Pressable>
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
})

export default WarehouseTransferPage
