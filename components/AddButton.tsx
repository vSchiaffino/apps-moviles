import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import Typography from './Typography'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export interface AddButtonProps extends TouchableOpacityProps {
  label?: string
}

const AddButton: React.FC<AddButtonProps> = ({ label = 'Nuevo', style, ...rest }) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          backgroundColor: Colors.primary[600],
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 120,
          padding: 14,
          gap: 5,
        },
        style,
      ]}
      {...rest}
    >
      <Ionicons name="add-circle-outline" size={24} color="white" />
      <Typography variant="subtitle" color="light" style={{ textAlign: 'center' }}>
        {label}
      </Typography>
    </TouchableOpacity>
  )
}

export default AddButton
