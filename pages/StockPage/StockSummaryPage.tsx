import React, { useState } from 'react';
import { View, FlatList, Modal, Pressable, Text, StyleSheet } from 'react-native';
import IconButton from '@/components/IconButton';
import ProductTable from '../ProductPage/ProductTable'
import Pagination from '@/models/Pagination';
import Sort from '@/models/Sort';

const StockSummaryPage = () => {
    const [items, setItems] = useState([
        { id: '1', name: 'Producto A', quantity: 10 },
        { id: '2', name: 'Producto B', quantity: 5 },
        { id: '3', name: 'Producto C', quantity: 7 },
        { id: '4', name: 'Producto D', quantity: 7 },
        { id: '5', name: 'Producto E', quantity: 4 },
        { id: '6', name: 'Producto F', quantity: 2 },
        { id: '7', name: 'Producto G', quantity: 1 },
    ]);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [products, setProducts] = useState(items);
    const [pagination, setPagination] = React.useState<Pagination>({
        page: 1,
        limit: 5,
      })
    const [sort, setSort] = React.useState<Sort>({
    field: 'name',
    direction: 'ASC',
    })
    const total = products.length;

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleAccept = () => {
        console.log('Aceptado');
    };

    const handleRowClick = (row: any) => {
        console.log('Producto seleccionado:', row);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.addButtonContainer} >
                <IconButton
                    size={32}
                    icon="add-outline"
                    color="white"
                    onPress={openModal}
                />
            </Pressable>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
                    </View>
                )}
                ListFooterComponent={
                    <Pressable style={styles.acceptButton} onPress={handleAccept}>
                        <Text style={styles.acceptButtonText}>Aceptar</Text>
                    </Pressable>
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <IconButton
                            onPress={closeModal}
                            size={32}
                            icon="close-outline"
                            color="white"
                            style={styles.closeButton}
                        />
                        {/* Hay que arreglar esto hay cosas que no me funcionan del todo bien  */}
                        <ProductTable
                            onClickRow={handleRowClick}
                            products={products}
                            total={total}
                            sort={sort}
                            setSort={setSort}
                            pagination={pagination}
                            setPagination={setPagination}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    itemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    addButtonContainer: {
        right: 16,
        top: 16,
        padding:12,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptButton: {
        padding: 16,
        backgroundColor: '#007bff',
        alignItems: 'center',
        marginVertical: 24,
        borderRadius: 8,
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    closeButton: {
        marginBottom: 15,
        padding:8,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default StockSummaryPage;