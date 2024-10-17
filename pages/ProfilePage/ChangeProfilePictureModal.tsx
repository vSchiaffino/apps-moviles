import IconCard from '@/components/IconCard'
import Typography from '@/components/Typography'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import { View } from 'react-native'
import {
  launchCameraAsync,
  getCameraPermissionsAsync,
  CameraType,
  requestMediaLibraryPermissionsAsync,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker'
import { Pressable } from 'react-native'
import Container from '@/components/Container'

export interface ChangeProfilePictureModalProps {
  show: boolean
  setShow: Function
  saveImage: Function
  setUserPic: Function
}

const ChangeProfilePictureModal: React.FC<ChangeProfilePictureModalProps> = ({
  show,
  setShow,
  saveImage,
  setUserPic,
}) => {
  const uploadImageCamera = async () => {
    try {
      await getCameraPermissionsAsync()
      let result = await launchCameraAsync({
        cameraType: CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!result.canceled) {
        await saveImage(result.assets[0].uri)
      }
    } catch (error: any) {
      alert('Error uploading image: ' + error.message)
      setShow(false)
    }
  }

  const uploadImageGallery = async () => {
    try {
      await requestMediaLibraryPermissionsAsync()
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!result.canceled) {
        await saveImage(result.assets[0].uri)
      }
    } catch (error: any) {
      alert('Error uploading image: ' + error.message)
      setShow(false)
    }
  }
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
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        onPress={() => setShow(false)}
      />
      <Container style={{ height: 'auto', gap: 10 }}>
        <Typography variant="h5">Elegí una foto</Typography>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <IconCard
            icon="camera-outline"
            color={'gray'}
            text="Cámara"
            onPress={() => uploadImageCamera()}
          />
          <IconCard
            icon="image-outline"
            color={'gray'}
            text="Galería"
            onPress={() => uploadImageGallery()}
          />
          <IconCard
            icon="trash-outline"
            color={'danger'}
            text="Remover"
            onPress={() => {
              setUserPic('../assets/images/test.jpeg')
              setShow(false)
            }}
          />
        </View>
      </Container>
    </ReactNativeModal>
  )
}

export default ChangeProfilePictureModal
