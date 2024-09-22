import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

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
        paddingVertical: 15,
        backgroundColor: '#1976d2',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default StyledButton

const styles = StyleSheet.create({})
