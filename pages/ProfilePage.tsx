import { StyleSheet, View, Image, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import Typography from '@/components/Typography'
import { UserPayload } from '@/context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import StyledButton from '@/components/StyledButton'
import { Colors } from '../constants/Colors'
import Container from '@/components/Container'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import { ScrollView } from 'react-native-gesture-handler'

interface ProfilePageProps {
  user: UserPayload
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [userPic, setUserPic] = useState('../assets/images/test.jpeg')
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible((prev) => !prev)
  }

  const onSubmit = () => {
    //TODO: Handle onSubmit change user
    console.log('on submit')
  }

  const fields: ValidatedField[] = [
    {
      name: 'user',
      label: 'Usuario',
      rules: {
        required: 'El usuario es requerido',
        minLength: {
          value: 4,
          message: 'El usuario debe tener más de 4 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El usuario debe tener menos de 20 caracteres',
        },
      },
    },
    {
      name: 'name',
      label: 'Nombre',
      rules: { required: 'El nombre es requerido' },
    },
    {
      name: 'lastName',
      label: 'Apellido',
      rules: { required: 'El apellido es requerido' },
    },
    {
      name: 'mail',
      label: 'Mail',
      disabled: true,
      rules: {
        required: 'El mail es requerido',
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          message: 'El mail es inválido',
        },
      },
    },
    {
      name: 'actualPassword',
      label: 'Contraseña Actual',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
        minLength: {
          value: 8,
          message: 'La contraseña no coincide con la contraseña actual',
        },
      },
    },
    {
      name: 'newPassword',
      label: 'Nueva Contraseña',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
        minLength: {
          value: 8,
          message: 'La contraseña debe tener más de 8 caracteres',
        },
      },
    },
    {
      name: 'repeatPassword',
      label: 'Repetir contraseña',
      password: true,
      rules: {
        required: 'La contraseña es requerida',
        validate: (value: string, { password }: { password: string }) =>
          value === password || 'Las contraseñas deben coincidir',
      },
    },
  ]

  return (
    <ScrollView>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Modal visible={modalVisible} transparent={true}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          >
            <View
              style={{
                width: 300,
                height: 500,
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 25,
              }}
            >
              <Typography variant="h3">Choose a photo</Typography>
              <StyledButton
                label="Cancel"
                style={{ backgroundColor: Colors.danger[600] }}
                onPress={() => showModal()}
              />
              <StyledButton
                label="Cancel"
                style={{ backgroundColor: Colors.danger[600] }}
                onPress={() => showModal()}
              />
            </View>
          </View>
        </Modal>

        <View
          style={{
            backgroundColor: '#3795BD',
            width: 200,
            height: 200,
            marginTop: 250,
            padding: 10,
            borderRadius: '50%',
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 100,
              left: '70%',
              backgroundColor: '#3795BD',
              borderRadius: '50%',
              padding: 20,
              width: 25,
              height: 25,
            }}
          >
            <Pressable onPress={() => showModal()} style={{ position: 'absolute' }}>
              <MaterialIcons name="edit" size={25} color={'white'} />
            </Pressable>
          </View>
          <Image
            source={{ uri: userPic }}
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
            }}
          />
        </View>

        <Typography variant="h3">{user.user}</Typography>

        <Container style={{ gap: 15 }}>
          <Typography variant="h6">Cambiar Datos</Typography>
          <ValidatedForm
            formProps={{
              defaultValues: {
                user: user.user,
                name: user.name,
                lastName: user.lastName,
                mail: user.mail,
                actualPassword: '',
                newPassword: '',
                repeatPassword: '',
              },
            }}
            submitLabel="Guardar"
            onSubmit={onSubmit}
            fields={fields}
          />
        </Container>
      </Container>
    </ScrollView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})
