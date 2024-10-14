import { StyleSheet, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Typography from '@/components/Typography'
import { UserPayload } from '@/context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import StyledButton from '@/components/StyledButton'
import { Colors } from '../constants/Colors'
import Container from '@/components/Container'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import * as ImagePicker from 'expo-image-picker'
import IconCard from '@/components/IconCard'

interface ProfilePageProps {
  user: UserPayload
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [userPic, setUserPic] = useState('../assets/images/test.jpeg')
  const [modalVisible, setModalVisible] = useState(false)

  const onSubmit = () => {
    //TODO: Handle onSubmit change user
  }

  const uploadImage = async () => {
    try {
      await ImagePicker.getCameraPermissionsAsync()
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!result.canceled) {
        await saveImage(result.assets[0].uri)
      }
    } catch (error: any) {
      alert('Error uploading image: ' + error.message)
      setModalVisible(false)
    }
  }

  const saveImage = async (image: string) => {
    try {
      setUserPic(image)
      setModalVisible(false)
    } catch (error) {}
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Modal
            isVisible={modalVisible}
            animationIn="fadeIn"
            animationInTiming={300}
            animationOut="fadeOut"
            animationOutTiming={300}
            hideModalContentWhileAnimating={true}
            backdropOpacity={0.3}
            onBackButtonPress={() => setModalVisible(false)}
          >
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '25%', //Hardcoded, should be fit-content like property
              }}
            >
              <View
                style={{
                  gap: 10,
                  width: '100%',
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 25,
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5">Elegí una foto</Typography>
                  <Pressable onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="close" size={24}></MaterialIcons>
                  </Pressable>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  <IconCard icon="camera-outline" color={'gray'} text="Camera" />
                  <IconCard icon="image-outline" color={'gray'} text="Gallery" />
                  <IconCard icon="trash-outline" color={'danger'} text="Remove" />
                </View>
              </View>
            </View>
          </Modal>

          <View
            style={{
              backgroundColor: Colors.primary[600],
              width: 200,
              height: 200,
              marginTop: 250,
              padding: 7,
              borderRadius: 999,
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
                backgroundColor: Colors.primary[600],
                borderRadius: 999,
                padding: 20,
                width: 25,
                height: 25,
              }}
            >
              <Pressable onPress={() => setModalVisible(true)} style={{ position: 'absolute' }}>
                <MaterialIcons name="edit" size={25} color={'white'} />
              </Pressable>
            </View>
            <Image
              source={{ uri: userPic }}
              style={{
                resizeMode: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: 999,
              }}
            />
          </View>

          <Typography variant="h4">{user.user}</Typography>

          <Container style={{ gap: 15, marginTop: 0 }}>
            <Typography variant="h6" color="gray">
              Datos Personales
            </Typography>
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
              onSubmit={() => onSubmit()}
              fields={fields}
            />
          </Container>
        </Container>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})
