import React, { useState } from 'react'; 
import { StyleSheet, View, Pressable, Modal } from 'react-native';
import Typography from '@/components/Typography';
import { MaterialIcons } from '@expo/vector-icons';
import IconSelect from '@/components/IconSelect';
import Container from '@/components/Container';
import { Calendar } from 'react-native-calendars';
import DateSelect from '@/components/DateSelect'; 
import { Link, router } from 'expo-router';


const StockManagerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(false); 
  };

  return (
    <Container style={{ justifyContent: 'center', gap: 10 }}>
      <View style={styles.headerContainer}>
        <MaterialIcons name="inventory" size={24} color="#007bff" />
        <Typography variant="h4" style={styles.header}>
          Registro de Stock
        </Typography>
      </View>
      <View style={styles.selectContainer}>
        <IconSelect
          icon="local-shipping"
          label="Depósito"
          options={['Depósito 1', 'Depósito 2', 'Depósito 3']}
          value={warehouse}
          onChange={setWarehouse}
        />
        <DateSelect
          label=""
          value={selectedDate}
          onChange={setSelectedDate}
          onPressIcon={() => setModalVisible(true)}
        />
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
              }}
              monthFormat={'yyyy MMMM'}  
            />
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Typography variant="h6" style={{ color: 'white' }}>Cerrar</Typography>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => router.push('/stockSummary')} style={styles.submitButton}>
        <MaterialIcons name="send" size={20} color="#fff" />
        <Typography variant="h6" style={styles.submitButtonText}>
          Siguiente
        </Typography>
      </Pressable>

    </Container>
  );
};

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
});

export default StockManagerPage;



