import React, { useState } from 'react'
import { StyleSheet, View, Pressable, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import Typography from '@/components/Typography'
import IconSelect from '@/components/IconSelect'
import Container from '@/components/Container'
import { Calendar } from 'react-native-calendars'
import DateSelect from '@/components/DateSelect'
import StyledButton from '@/components/StyledButton'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import IconCard from '@/components/IconCard'
import InfoCard from '@/components/InfoCard'

const StockManagerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [warehouse, setWarehouse] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString)
    setModalVisible(false)
  }

  return (
    <Container>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          height: '100%',
        }}
      >
        <InfoCard
          infoText={
            'Selecciona el depósito del cual quisieras retirar el stock para el turno.' +
            '\n' +
            'Luego selecciona la fecha y presiona "Siguiente" para continuar'
          }
        />
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
        <Modal
          isVisible={modalVisible}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          useNativeDriverForBackdrop={true}
          backdropOpacity={0.7}
          hasBackdrop={true}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              backgroundColor: 'white',
              backfaceVisibility: 'hidden',
            }}
          >
            <Calendar
              style={{ backgroundColor: 'transparent' }}
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
              }}
              monthFormat={'yyyy MMMM'}
            />
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Typography variant="h6" style={{ color: 'white' }}>
                Cerrar
              </Typography>
            </Pressable>
          </View>
        </Modal>

        <StyledButton label="Siguiente"></StyledButton>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  headerContainer: {},
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
})

export default StockManagerPage
