import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Typography from '@/components/Typography';

interface Product {
  id: number;
  name: string;
  image: any;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onSelect: (id: number) => void;
  isSelected: boolean; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, isSelected }) => {
  return (
    <View style={styles.card}>
      <Image source={product.image} />
      <View style={styles.productDetails}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="h6">Stock: {product.stock}</Typography>
      </View>
      <View style={{ marginRight: '10%' ,alignItems:'center'}}>
        <Typography variant="h6">Select</Typography>
        <Pressable
          onPress={() => onSelect(product.id)}
          style={[
            styles.selectButton,
            isSelected && styles.selectedButton, 
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  productDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginLeft: '10%',
  },
  selectButton: {
    width: 20,
    height: 20,
    borderRadius: 10, 
    backgroundColor: 'white', 
    borderWidth: 2, 
    borderColor: '#ccc', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10%',
  },
  selectedButton: {
    borderColor: 'lightgreen', 
  },
});

export default ProductCard;



