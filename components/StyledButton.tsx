import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'

export interface StyledButtonProps extends TouchableOpacityProps {
  label: string
  type?: 'filled'
}

const StyledButton: React.FC<StyledButtonProps> = ({
  label,
  type = 'filled',
  disabled,
  ...rest
}) => {
  const backgroundColor = disabled ? Colors.primaryDisabled : Colors.primary
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        paddingVertical: 14,
        backgroundColor,
      }}
      disabled={disabled}
      {...rest}
    >
      <Typography variant="subtitle" color="light" style={{ textAlign: 'center' }}>
        {label}
      </Typography>
    </TouchableOpacity>
  )
}

export default StyledButton

const styles = StyleSheet.create({})
