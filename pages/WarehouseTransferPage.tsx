import React, { useState } from 'react'; 
import { StyleSheet, View, Alert, Pressable } from 'react-native';
import Typography from '@/components/Typography';
import ProductCard from '@/components/ProductCard';
import OutlinedInput from '@/components/OutlinedInput';
import OutlinedSelect from '@/components/OutlinedSelect/OutlinedSelect';
import Counter from '@/components/Counter';
import { MaterialIcons } from '@expo/vector-icons';

const WarehouseTransferPage: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [origin, setOrigin] = React.useState('')
  const [destination, setDestination] = React.useState('')
  const [product, setProduct] = React.useState('')
  const [ quantity, setQuantity ] = React.useState('')

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
      <View style={styles.headerContainer}>
        <MaterialIcons name="inventory" size={24} color="#007bff" />
        <Typography variant="h5" style={styles.header}>Warehouse Transfer</Typography>
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.selectWrapper}>
          <View style={styles.iconWrapper}> 
            <MaterialIcons name="store" size={20} color="#333" style={styles.icon} />
          </View>
          <View style={{flex: 1}}>
            <OutlinedSelect
              label="Origen"
              options={['Deposito 1', 'Deposito 2', 'Deposito 3']}
              option={origin}
              setOption={setOrigin}
            />
          </View>
        </View>
        <View style={styles.selectWrapper}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="local-shipping" size={20} color="#333" style={styles.icon} />
          </View>
          <View style={{flex: 1}}>
            <OutlinedSelect
              label="Destino"
              options={['Deposito 1', 'Deposito 2', 'Deposito 3']}
              option={destination}
              setOption={setDestination}
            />
          </View>
        </View>
        <View style={styles.selectWrapper}>
          <View style={styles.iconWrapper}> 
            <MaterialIcons name="category" size={20} color="#333" style={styles.icon} />
          </View>
          <View style={{flex: 1}}>
            <OutlinedSelect
              label="Productos"
              options={['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5']}
              option={product}
              setOption={setProduct}
            />
          </View>
        </View>
        <View style={styles.selectWrapper}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="production-quantity-limits" size={20} color="#333" style={styles.icon} />
          </View>
          <View style={{flex: 1}}>
            <OutlinedInput
              label="Cantidad"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <MaterialIcons name="send" size={20} color="#fff" />
        <Typography variant="h6" style={styles.submitButtonText}>Enviar</Typography>
      </Pressable>
    </View>
  )};
  
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: '5%',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin:'5%',
    },
    header: {
      marginLeft: 8,
      textAlign: 'center',
    },
    selectContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      marginVertical: '7%',
    },
    selectWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: '5%',
      width: '100%'
    },
    iconWrapper: {
      width: 30, 
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    icon: {
      marginRight: 8,
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


