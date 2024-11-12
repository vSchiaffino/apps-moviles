import React, { useState } from 'react';
import { View, FlatList, Modal, Pressable, Text, StyleSheet } from 'react-native';
import IconButton from '@/components/IconButton';

const StockSummaryPage = () => {
    const [items, setItems] = useState([
        { id: '1', name: 'Producto A', quantity: 10 },
        { id: '2', name: 'Producto B', quantity: 5 },
        { id: '3', name: 'Producto C', quantity: 20 }
    ]);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleAccept = () => {
        console.log('Aceptado');
    };

    return (
        <View style={styles.container}>
            <IconButton
                icon="add" // Asegurarse de que el icono es válido
                label=""
                style={styles.addButton}
                onPress={openModal} // Asegura que el evento onPress esté vinculado
            />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingTop: 80 }}
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
                    <Pressable style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </Pressable>
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
    addButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        backgroundColor: '#007bff',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    acceptButton: {
        padding: 16,
        backgroundColor: '#007bff',
        alignItems: 'center',
        marginTop: 16,
        borderRadius: 8,
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    closeButton: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    closeButtonText: {
        fontSize: 16,
    },
});

export default StockSummaryPage;



