import { StyleSheet, View, Image, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import Typography from '@/components/Typography'
import { UserPayload } from '@/context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import StyledButton from '@/components/StyledButton'
import { Colors } from '../constants/Colors'

interface ProfilePageProps {
  user : UserPayload
}

const ProfilePage = ({user} : ProfilePageProps) => {
  
  const [userPic, setUserPic] = useState('../assets/images/test.jpeg')
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    console.log(modalVisible)
    setModalVisible(prev => !prev)
  }

    return (
    <View style={{display: 'flex', width: '100%', height: '100%', padding: 10, alignItems: 'center'}}>
      
      <Modal visible={modalVisible}>
        <Typography variant='h2'>Change</Typography>
        <StyledButton label='Cancel' style={{backgroundColor: Colors.danger}} onPress={() => showModal()}/>
      </Modal>

      <View style={{
        backgroundColor: '#3795BD', 
        width: 200, 
        height: 200,
        margin: 10,
        padding: 10,
        borderRadius: '50%',
      }}>
          <View style={{display: 'flex', justifyContent:'center', alignItems:'center', position: 'absolute', zIndex: 100, left: '70%', backgroundColor: '#3795BD', borderRadius: '50%', padding: 20, width: 25, height: 25}}>
            <Pressable onPress={() => showModal()} style={{position: 'absolute'}}>
              <MaterialIcons name='edit' size={25} color={'white'}/>
            </Pressable>
          </View>
          <Image 
          source={{ uri: userPic }}
          style={{
            resizeMode: 'cover',
            width: '100%', 
            height: '100%', 
            borderRadius: '50%'
          }}/>
      </View>

      <Typography variant='h3'>{user.user}</Typography>

      <View style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderWidth: 1
      }}>
        

      </View>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({})