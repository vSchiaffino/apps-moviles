import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Modal from 'react-native-modal'
import Typography from '@/components/Typography'
import OutlinedInput from '@/components/OutlinedInput'
import { MaterialIcons } from '@expo/vector-icons'

interface TransferDetailsModalProps {
  visible: boolean
  onClose: () => void
  product: string
  origin: string
  destination: string
  stock: number
}

const TransferDetailsModal: React.FC<TransferDetailsModalProps> = ({
  visible,
  onClose,
  product,
  origin,
  destination,
  stock,
}) => {
  const [quantity, setQuantity] = useState('')

  const handleSubmit = () => {
    console.log('Enviando:', { product, origin, destination, quantity })
    onClose()
  }

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <Pressable
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        onPress={onClose}
      />
      <View style={styles.modalContainer}>
        <Typography variant="h6" style={styles.title}>
          Detalles de Transferencia
        </Typography>
        <Typography variant="subtitle" style={styles.label}>
          Producto: {product}
        </Typography>
        <Typography variant="subtitle" style={styles.label}>
          Origen: {origin}
        </Typography>
        <Typography variant="subtitle" style={styles.label}>
          Destino: {destination}
        </Typography>
        <OutlinedInput
          label="Cantidad"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Typography variant="subtitle" style={styles.label}>
          Cantidad máxima disponible: {stock}
        </Typography>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <MaterialIcons name="send" size={20} color="#fff" />
          <Typography variant="h6" style={styles.submitButtonText}>
            Enviar
          </Typography>
        </Pressable>

        <Pressable style={styles.closeButton} onPress={onClose}>
          <Typography variant="h6" style={styles.closeButtonText}>
            Cerrar
          </Typography>
        </Pressable>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  title: {
    marginBottom: 10,
  },
  label: {
    marginVertical: 5,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
})

export default TransferDetailsModal
