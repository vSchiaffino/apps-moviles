import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'

export interface StyledButtonProps {
  label: string
  type?: 'filled'
}

const StyledButton: React.FC<StyledButtonProps> = ({
  label,
  type = 'filled',
}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        paddingVertical: 14,
        backgroundColor: Colors.primary,
      }}
    >
      <Typography
        variant='subtitle'
        color='light'
        style={{ textAlign: 'center' }}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  )
}

export default StyledButton

const styles = StyleSheet.create({})
