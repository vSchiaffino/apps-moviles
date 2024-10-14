import { StyleSheet, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Typography from '@/components/Typography'
import { UserPayload } from '@/context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import Container from '@/components/Container'
import ValidatedForm, { ValidatedField } from '@/components/ValidatedForm'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ChangeProfilePictureModal from './ChangeProfilePictureModal'
import ProfilePicture from './ProfilePicture'

interface ProfilePageProps {
  user: UserPayload
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [userPic, setUserPic] = useState('../assets/images/test.jpeg')
  const [modalVisible, setModalVisible] = useState(false)

  const onSubmit = async () => {
    return //TODO: Handle onSubmit change user
  }

  const saveImage = async (image: string) => {
    try {
      setUserPic(image)
      setModalVisible(false)
    } catch (error) {}
  }

  const fields: ValidatedField[] = [
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
      name: 'user',
      label: 'Usuario',
      disabled: true,
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
  ]

  const fields2: ValidatedField[] = [
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
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ChangeProfilePictureModal
            saveImage={saveImage}
            setUserPic={setUserPic}
            setShow={setModalVisible}
            show={modalVisible}
          />
          <ProfilePicture onClickEdit={() => setModalVisible(true)} picUrl={userPic} />
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
                },
              }}
              submitLabel="Guardar"
              onSubmit={() => onSubmit()}
              fields={fields}
            />

            <Typography variant="h6" color="gray">
              Contraseña
            </Typography>
            <ValidatedForm
              formProps={{
                defaultValues: {
                  actualPassword: '',
                  newPassword: '',
                  repeatPassword: '',
                },
              }}
              submitLabel="Cambiar Contraseña"
              onSubmit={() => onSubmit()}
              fields={fields2}
            />
          </Container>
        </Container>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})
