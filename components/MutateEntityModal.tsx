import { View, Pressable } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import Typography from '@/components/Typography'
import Card from '@/components/Card'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export interface MutateEntityModalProps {
  show: boolean
  setShow: Function
  isCreating: boolean
  entityName: string
  children: React.ReactNode
}

const MutateEntityModal: React.FC<MutateEntityModalProps> = ({
  show,
  setShow,
  isCreating,
  entityName,
  children,
}) => {
  const action = isCreating ? 'Creando' : 'Editando'
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
          <Typography variant="h5">
            {action} un {entityName}
          </Typography>
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
        {children}
      </Card>
    </ReactNativeModal>
  )
}

export default MutateEntityModal
