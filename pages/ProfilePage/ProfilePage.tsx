import React, { useState } from 'react'
import Typography from '@/components/Typography'
import Container from '@/components/Container'
import { ScrollView } from 'react-native-gesture-handler'
import ChangeProfilePictureModal from './ChangeProfilePictureModal'
import ProfilePicture from './ProfilePicture'
import TabsSelector from './TabsSelector'
import PersonalDataTab from './PersonalDataTab'
import ChangePasswordTab from './ChangePasswordTab'
import StyledButton from '@/components/StyledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthorizedUser } from '@/hooks/useUser'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { router } from 'expo-router'

const ProfilePage = () => {
  const { user, setUser, editUser, changePicture } = useAuthorizedUser()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)

  const onSubmit = async (form: any) => {
    await editUser(form)
  }

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
        <View style={{ width: '100%', gap: 15 }}>
          <TabsSelector
            tabs={['Datos personales', 'Contraseña']}
            selected={selectedTab}
            setSelected={setSelectedTab}
          />
          {selectedTab === 0 ? (
            <PersonalDataTab user={user} onSubmit={onSubmit} />
          ) : (
            <ChangePasswordTab />
          )}
        </View>
        <StyledButton
          color="danger"
          label="Cerrar sesión"
          iconRight={'log-out-outline'}
          onPress={async () => {
            setUser(null)
            await AsyncStorage.clear()
            router.push('/login')
          }}
        />
      </ScrollView>
    </Container>
  )
}

export default ProfilePage
