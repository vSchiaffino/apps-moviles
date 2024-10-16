import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Typography from '@/components/Typography';
import OutlinedInput from '@/components/OutlinedInput';
import { MaterialIcons } from '@expo/vector-icons';
import IconSelect from '@/components/IconSelect'; // Importamos el nuevo componente

const WarehouseTransferPage: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = () => {
    console.log('Submit');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialIcons name="inventory" size={24} color="#007bff" />
        <Typography variant="h3" style={styles.header}>Transferencias</Typography>
      </View>
      <View style={styles.selectContainer}>
        <IconSelect
          icon="category"
          label="Productos"
          options={['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5']}
          value={product}
          onChange={setProduct}
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
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <MaterialIcons name="send" size={20} color="#fff" />
        <Typography variant="h6" style={styles.submitButtonText}>Enviar</Typography>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '5%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
  },
  header: {
    marginLeft: 8,
    textAlign: 'center',
  },
  selectContainer: {
    flex: 1,
    justifyContent: 'center',
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
});

export default WarehouseTransferPage;



