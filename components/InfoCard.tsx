import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'

export interface InfoCardProps {
  infoText: string
}

const InfoCard = ({ infoText }: InfoCardProps) => {
  return (
    <View
      style={{
        width: '100%',
        height: 'auto',
        padding: 16,
        paddingLeft: 10,
        borderRadius: 16,
        gap: 10,
        backgroundColor: Colors.gray[200],
        flexDirection: 'row',
      }}
    >
      <Ionicons name="information-circle" size={24} color={Colors.primary[600]} />
      <Typography
        variant="body"
        textBreakStrategy="highQuality"
        style={{ textAlign: 'justify', color: Colors.gray[700], width: '90%' }}
      >
        {infoText}
      </Typography>
    </View>
  )
}

export default InfoCard
