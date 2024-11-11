import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import Typography from './Typography'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export interface StyledButtonProps extends TouchableOpacityProps {
  label: string
  color?: 'primary' | 'danger'
  type?: 'filled'
  iconRight?: any
}

const StyledButton: React.FC<StyledButtonProps> = ({
  label,
  disabled,
  color = 'primary',
  type = 'filled',
  iconRight,
  ...rest
}) => {
  const colorScheme = Colors[color]
  const backgroundColor = disabled ? colorScheme[300] : colorScheme[600]
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
      {iconRight && (
        <Ionicons
          name={iconRight}
          size={27}
          color={Colors.gray[100]}
          style={{ marginLeft: 10, padding: 0 }}
        />
      )}
    </TouchableOpacity>
  )
}

export default StyledButton

const styles = StyleSheet.create({})
