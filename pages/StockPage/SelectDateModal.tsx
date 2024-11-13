import { Pressable, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import DateSelect from '@/components/DateSelect'
import { Calendar } from 'react-native-calendars'
import Typography from '@/components/Typography'

interface SelecteDateModalProps {
  selectedDate: string
  setSelectedDate: (date: string) => void
  visible: boolean
  setVisible: (visible: boolean) => void
}

const SelectDateModal = ({
  selectedDate,
  setSelectedDate,
  visible,
  setVisible,
}: SelecteDateModalProps) => {
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString)
    setVisible(false)
  }
  return (
    <>
      <Modal
        isVisible={visible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        useNativeDriverForBackdrop={true}
        backdropOpacity={0.7}
        hasBackdrop={true}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
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
          <Pressable onPress={() => setVisible(false)} style={styles.closeButton}>
            <Typography variant="h6" style={{ color: 'white' }}>
              Cerrar
            </Typography>
          </Pressable>
        </View>
      </Modal>
    </>
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

export default SelectDateModal
