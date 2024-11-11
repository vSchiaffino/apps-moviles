import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import Typography from './Typography'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

export interface AddButtonProps extends TouchableOpacityProps {
  label?: string
  icon?: string
  library?: 'Ionicons' | 'mui'
}

const IconButton: React.FC<AddButtonProps> = ({
  label = 'Nuevo',
  library = 'Ionicons',
  style,
  icon,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          backgroundColor: Colors.primary[600],
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          padding: 14,
          gap: 5,
        },
        style,
      ]}
      {...rest}
    >
      {library === 'Ionicons' && <Ionicons name={icon as any} size={24} color="white" />}
      {library === 'mui' && <MaterialIcons name={icon as any} size={20} color="white" />}

      <Typography variant="subtitle" color="light" style={{ textAlign: 'center' }}>
        {label}
      </Typography>
    </TouchableOpacity>
  )
}

export default IconButton
