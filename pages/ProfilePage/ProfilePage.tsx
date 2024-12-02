import React, { useState } from 'react'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import { ScrollView } from 'react-native'
import ChangeProfilePictureModal from './ChangeProfilePictureModal'
import ProfilePicture from './ProfilePicture'
import StyledButton from '@/components/StyledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthorizedUser } from '@/hooks/useUser'
import { router } from 'expo-router'

const ProfilePage = () => {
  const { user, setUser, changePicture } = useAuthorizedUser()
  const [modalVisible, setModalVisible] = useState(false)

  const saveImage = async (imageUri: string) => {
    try {
      changePicture(imageUri)
      setModalVisible(false)
    } catch (error) {
      console.error('Error uploading image', error)
    }
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          gap: 10,
          justifyContent: 'center',
          padding: 16,
          paddingTop: 30,
          paddingBottom: 76,
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ChangeProfilePictureModal
          saveImage={saveImage}
          setUserPic={saveImage}
          setShow={setModalVisible}
          show={modalVisible}
        />
        <ProfilePicture
          onClickEdit={() => setModalVisible(true)}
          picUrl={user?.profilePictureUrl}
        />
        <Typography variant="h4">{user?.user}</Typography>
        <StyledButton
          color="primary"
          label="Cerrar sesión"
          iconRight={'log-out-outline'}
          onPress={async () => {
            setUser(null)
            await AsyncStorage.clear()
            router.replace('/login')
          }}
        />
      </ScrollView>
    </Container>
  )
}

export default ProfilePage
