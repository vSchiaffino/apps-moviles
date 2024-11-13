import { View, Pressable } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import Typography from '@/components/Typography'
import Card from '@/components/Card'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import IconButton from './IconButton'

export interface MutateEntityModalProps {
  show: boolean
  setShow: Function
  isCreating?: boolean
  entityName?: string
  title?: string
  children: React.ReactNode
}

const MutateEntityModal: React.FC<MutateEntityModalProps> = ({
  show,
  setShow,
  isCreating,
  title,
  entityName,
  children,
}) => {
  const action = isCreating ? 'Crear' : 'Editar'
  return (
    <ReactNativeModal
      isVisible={show}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={() => setShow(false)}
      onBackdropPress={() => setShow(false)}
      useNativeDriverForBackdrop={true}
    >
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
            paddingBottom: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: Colors.gray[100],
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">{title ? title : `${action} ${entityName}`}</Typography>
          <IconButton
            icon="close"
            hitSlop={20}
            size={20}
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
