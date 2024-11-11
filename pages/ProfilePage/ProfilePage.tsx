import React, { useState } from 'react'
import Typography from '@/components/Typography'
import { UserPayload } from '@/context/AuthContext'
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
import { View } from 'react-native'

interface ProfilePageProps {
  user: UserPayload
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const { setUser } = useAuthorizedUser()
  const [userPic, setUserPic] = useState('../assets/images/test.jpeg')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)

  const onSubmit = async () => {
    return //TODO: Handle onSubmit change user
  }

  const saveImage = async (image: string) => {
    try {
      setUserPic(image)
      setModalVisible(false)
    } catch (error) {}
  }

  return (
    <Container pageHeader="Perfil">
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          gap: 10,
          justifyContent: 'center',
          marginTop: 16,
          paddingBottom: 76,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ChangeProfilePictureModal
          saveImage={saveImage}
          setUserPic={setUserPic}
          setShow={setModalVisible}
          show={modalVisible}
        />
        <ProfilePicture onClickEdit={() => setModalVisible(true)} picUrl={userPic} />
        <Typography variant="h4">{user.user}</Typography>
        <View style={{ width: '100%', gap: 15 }}>
          <TabsSelector
            tabs={['Datos personales', 'Contraseña']}
            selected={selectedTab}
            setSelected={setSelectedTab}
          />
          {selectedTab === 0 ? <PersonalDataTab user={user} /> : <ChangePasswordTab />}
        </View>
        <StyledButton
          color="danger"
          label="Cerrar sesión"
          iconRight={'log-out-outline'}
          onPress={() => {
            AsyncStorage.clear()
            setUser(null)
          }}
        />
      </ScrollView>
    </Container>
  )
}

export default ProfilePage
