import React, { useState } from 'react'
import Typography from '@/components/Typography'
import { UserPayload } from '@/context/AuthContext'
import Container from '@/components/Container'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ChangeProfilePictureModal from './ChangeProfilePictureModal'
import ProfilePicture from './ProfilePicture'
import TabsSelector from './TabsSelector'
import PersonalDataTab from './PersonalDataTab'
import ChangePasswordTab from './ChangePasswordTab'

interface ProfilePageProps {
  user: UserPayload
}

const ProfilePage = ({ user }: ProfilePageProps) => {
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
    <GestureHandlerRootView>
      <ScrollView>
        <Container style={{ alignItems: 'center', height: 'auto' }}>
          <ChangeProfilePictureModal
            saveImage={saveImage}
            setUserPic={setUserPic}
            setShow={setModalVisible}
            show={modalVisible}
          />
          <ProfilePicture onClickEdit={() => setModalVisible(true)} picUrl={userPic} />
          <Typography variant="h4">{user.user}</Typography>
          <Container style={{ gap: 15, marginTop: 0, height: 'auto' }}>
            <TabsSelector
              tabs={['Datos personales', 'Contraseña']}
              selected={selectedTab}
              setSelected={setSelectedTab}
            />
            {selectedTab === 0 ? <PersonalDataTab user={user} /> : <ChangePasswordTab />}
          </Container>
        </Container>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default ProfilePage
