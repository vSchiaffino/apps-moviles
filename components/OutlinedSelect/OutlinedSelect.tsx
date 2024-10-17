import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import Typography from '../Typography'
import SelectItems from './SelectItems'

export interface OutlinedInputProps {
  label: string
  option: string
  options: string[]
  setOption: (option: string) => void
  error?: boolean
  errorMessage?: string
  disabled?: boolean
}

const OutlinedSelect: React.FC<OutlinedInputProps> = ({
  label,
  option,
  setOption,
  options,
  error = false,
  errorMessage = '',
  disabled,
}) => {
  const inputRef = useRef<View>(null)
  const [inputMeasures, setInputMeasures] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const handlePress = () => {
    if (!inputRef.current) return
    inputRef.current.measure((fx, fy, width, height, px, py) => {
      setInputMeasures({ top: py, left: px, width, height })
      setIsFocused(true)
    })
  }
  const showError = error === true || errorMessage !== ''
  const [isFocused, setIsFocused] = useState(false)
  const isLabelOnTop = isFocused || option !== ''
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
      <Pressable
        ref={inputRef}
        onPress={handlePress}
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
      >
        <Typography variant="body" color="dark">
          {option}
        </Typography>
      </Pressable>
      {!!errorMessage && (
        <Typography variant="subtitle" color="danger">
          {errorMessage}
        </Typography>
      )}

      {isFocused && (
        <SelectItems
          inputMeasures={inputMeasures}
          onDismiss={() => setIsFocused(false)}
          options={options}
          onSelectOption={(selectedOption) => {
            setOption(selectedOption)
            setIsFocused(false)
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  label: {
    fontWeight: '400',
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
    height: 52,
    color: Colors.gray[900],
    fontSize: 16,
    width: '100%',
    paddingTop: 12,
    paddingRight: 10,
    paddingBottom: 12,
    paddingLeft: 15,
    borderRadius: 8,
    zIndex: -1,
  },
})

export default OutlinedSelect
