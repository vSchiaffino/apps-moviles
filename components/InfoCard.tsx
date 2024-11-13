import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'

export interface InfoCardProps {
  infoText: string
  backgroundColor?: string
  textColor?: string
  iconColor?: string
}

const InfoCard = ({
  infoText,
  backgroundColor = Colors.gray[200],
  textColor = Colors.gray[700],
  iconColor = Colors.primary[600],
}: InfoCardProps) => {
  return (
    <View
      style={{
        width: '100%',
        height: 'auto',
        padding: 16,
        paddingLeft: 10,
        borderRadius: 16,
        gap: 10,
        backgroundColor: backgroundColor,
        flexDirection: 'row',
      }}
    >
      <Ionicons name="information-circle" size={24} color={iconColor} />
      <Typography
        variant="body"
        textBreakStrategy="highQuality"
        style={{ textAlign: 'justify', color: textColor, width: '90%' }}
      >
        {infoText}
      </Typography>
    </View>
  )
}

export default InfoCard
