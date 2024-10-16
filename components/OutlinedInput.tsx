import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'
import React, { forwardRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import Typography from './Typography'

export interface OutlinedInputProps extends TextInputProps {
  label: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
}

const OutlinedInput = forwardRef<TextInput, OutlinedInputProps>(
  ({ label, value, error = false, errorMessage = '', disabled, onBlur, onFocus, ...rest }, ref) => {
    const showError = error === true || errorMessage !== ''
    const isEmpty = value === ''
    const [isFocused, setIsFocused] = useState(false)
    const isLabelOnTop = isFocused || !isEmpty
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.label,
            {
              top: isLabelOnTop ? -7 : 19,
              zIndex: isLabelOnTop ? 1 : -1,
              color: disabled
                ? Colors.gray[500]
                : showError
                  ? Colors.danger[600]
                  : isFocused
                    ? Colors.primary[600]
                    : Colors.gray[900],
              userSelect: 'none',
            },
          ]}
        >
          {label}
        </Text>
        <TextInput
          ref={ref}
          onBlur={(e) => {
            setIsFocused(false)
            onBlur && onBlur(e)
          }}
          onFocus={(e) => {
            setIsFocused(true)
            onFocus && onFocus(e)
          }}
          editable={!disabled}
          pointerEvents={disabled ? 'none' : undefined}
          autoCapitalize="none"
          style={[
            styles.input,
            {
              borderWidth: isFocused || showError ? 1.5 : 0.75,
              borderColor: showError
                ? Colors.danger[600]
                : isFocused
                  ? Colors.primary[600]
                  : Colors.gray[900],
              opacity: disabled ? 0.4 : 1,
            },
          ]}
          value={value}
          {...rest}
        />
        {!!errorMessage && (
          <Typography variant="subtitle" color="danger">
            {errorMessage}
          </Typography>
        )}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 16,
    position: 'absolute',
    left: 15,
    zIndex: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
    backgroundColor: Colors.gray[100],
  },
  input: {
    color: Colors.gray[900],
    fontSize: 16,
    width: '100%',
    paddingTop: 12,
    paddingRight: 10,
    paddingBottom: 12,
    paddingLeft: 15,
    borderRadius: 8,
  },
})

export default OutlinedInput
