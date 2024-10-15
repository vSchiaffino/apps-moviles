import React, { useState } from 'react'; 
import { StyleSheet, View, Alert, Pressable } from 'react-native';
import Typography from '@/components/Typography';
import ProductCard from '@/components/ProductCard';
import OutlinedInput from '@/components/OutlinedInput';

const WarehouseTransferPage: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleSelectProduct = (id: number) => {
    setSelectedProductId(id === selectedProductId ? null : id); 
    console.log('Selected product', id);
  };

  const handleSubmit = () => {
    console.log('Submit');
  };

  const products = [
    { id: 1, name: 'Product 1', image: require('../assets/images/botellatest.png'), stock: 10 },
    { id: 2, name: 'Product 2', image: require('../assets/images/botellatest.png'), stock: 20 },
    { id: 3, name: 'Product 3', image: require('../assets/images/botellatest.png'), stock: 30 },
    { id: 4, name: 'Product 4', image: require('../assets/images/botellatest.png'), stock: 40 },
    { id: 5, name: 'Product 5', image: require('../assets/images/botellatest.png'), stock: 50 },
  ];

  return (
    <View style={styles.container}>
      <Typography variant="h5" style={styles.header}>Warehouse Transfer</Typography>
      <View>
        <View style={{ margin: '1%' }}>
          <OutlinedInput label="From" />
        </View>
        <View style={{ margin: '1%' }}>
          <OutlinedInput label="To" />
        </View>
      </View>
      <View style={styles.productList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={handleSelectProduct}
            isSelected={selectedProductId === product.id} 
          />
        ))}
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Typography variant="h6" style={styles.submitButtonText}>Enviar</Typography>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    textAlign: 'center',
  },
  productList: {
    flex: 1,
  },
  submitButton: {
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
  },
});

export default WarehouseTransferPage;


