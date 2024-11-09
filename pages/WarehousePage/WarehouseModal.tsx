import { View, Pressable } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import Typography from '@/components/Typography'
import Card from '@/components/Card'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'

export interface WarehouseModalProps {
  show: boolean
  setShow: Function
  onSubmit: (form: any) => Promise<void>
}

// TODO: this modal could be extracted as a generic create/edit entity
const WarehouseModal: React.FC<WarehouseModalProps> = ({ show, setShow, onSubmit }) => {
  const fields: ValidatedField[] = [
    {
      name: 'name',
      label: 'Nombre',
      component: 'input',
      rules: {
        required: 'Este campo es obligatorio',
      },
      inputProps: {
        backgroundColor: 'white',
      },
    },
    {
      name: 'capacity',
      label: 'Capacidad',
      rules: {
        required: 'Este campo es obligatorio',
        valueAsNumber: true,
        min: {
          value: 1,
          message: 'La capacidad debe ser mayor a 0',
        },
      },
      component: 'input',
      inputProps: {
        backgroundColor: 'white',
        keyboardType: 'numeric',
      },
    },
  ]
  return (
    <ReactNativeModal
      isVisible={show}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      onBackButtonPress={() => setShow(false)}
    >
      <Pressable
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        onPress={() => setShow(false)}
      />
      <Card
        style={{
          height: 'auto',
          maxHeight: '80%',
          padding: 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: Colors.gray[100],
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Creando un depósito</Typography>
          <Ionicons
            name="close"
            size={30}
            style={{
              marginLeft: 'auto',
              backgroundColor: Colors.gray[200],
              borderRadius: 999,
              padding: 5,
            }}
            color={Colors.gray[800]}
            onPress={() => setShow(false)}
          />
        </View>
        <View style={{ flexDirection: 'column', gap: 20, padding: 20 }}>
          <ValidatedForm fields={fields} onSubmit={onSubmit} submitLabel="Crear" />
        </View>
      </Card>
    </ReactNativeModal>
  )
}

export default WarehouseModal
