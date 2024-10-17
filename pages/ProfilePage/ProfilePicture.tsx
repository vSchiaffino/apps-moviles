import { Colors } from '@/constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, Pressable, View } from 'react-native'

export interface ProfilePictureProps {
  onClickEdit: () => void
  picUrl: string
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ onClickEdit, picUrl }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.primary[600],
        width: 200,
        height: 200,
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
        <Pressable hitSlop={30} onPress={onClickEdit} style={{ position: 'absolute' }}>
          <MaterialIcons name="edit" size={25} color={'white'} />
        </Pressable>
      </View>
      <Image
        source={{ uri: picUrl }}
        style={{
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
          borderRadius: 999,
        }}
      />
    </View>
  )
}

export default ProfilePicture
