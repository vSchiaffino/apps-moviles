import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'
import React, { useState } from 'react'

interface OutlinedInputProps extends TextInputProps {
  label: string
}

const OutlinedInput: React.FC<OutlinedInputProps> = ({
  label,
  value,
  ...rest
}) => {
  const isEmpty = value === ''
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            top: isFocused || !isEmpty ? -7 : 19,
            color: isFocused ? '#1976d2' : '#666666',
          },
        ]}
      >
        {label}
      </Text>
      <TextInput
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        style={[
          styles.input,
          {
            borderWidth: isFocused ? 1.5 : 0.75,
            borderColor: isFocused ? '#1976d2' : '#6c6c6c',
          },
        ]}
        value={value}
        {...rest}
      />
    </View>
  )
}

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
    backgroundColor: '#f2f2f2',
  },
  input: {
    color: '#212121',
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
