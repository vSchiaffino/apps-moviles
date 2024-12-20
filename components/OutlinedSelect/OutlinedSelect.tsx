import { View, Text, StyleSheet, Pressable, Animated, useColorScheme } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import Typography from '../Typography'
import SelectItems from './SelectItems'
import { OutlinedInputProps } from '../OutlinedInput'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

export interface OutlinedSelectProps extends Partial<OutlinedInputProps> {
  option: any
  options: any[]
  setOption: (option: any) => void
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  renderOption?: (option: any) => string
  optionsYOffset?: number
}

const OutlinedSelect: React.FC<OutlinedSelectProps> = ({
  label,
  option,
  setOption,
  options,
  disabled,
  optionsYOffset = 0,
  renderOption = (option: any) => option,
  error = false,
  errorMessage = '',
  backgroundColor = DefaultTheme.colors.background,
}) => {
  const scheme = useColorScheme()
  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {
    animateLabel(isFocused || !!option ? 1 : 0)
  }, [option, isFocused])
  const isLabelOnTop = isFocused || !!option
  const inputRef = useRef<View>(null)
  const [inputMeasures, setInputMeasures] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const handlePress = () => {
    if (!inputRef.current) return
    inputRef.current.measure((fx, fy, width, height, px, py) => {
      setInputMeasures({ top: py + optionsYOffset, left: px, width, height })
      setIsFocused(true)
      animateLabel(1)
    })
  }
  const showError = error === true || errorMessage !== ''

  const animatedValue = useRef(new Animated.Value(0)).current

  const animateLabel = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 50,
      useNativeDriver: false,
    }).start()
  }

  const labelPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [19, -7],
  })

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {label && (
          <Animated.Text
            style={[
              styles.label,
              {
                backgroundColor: backgroundColor,
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
              {
                transform: [{ translateY: labelPosition }],
              },
            ]}
          >
            {label}
          </Animated.Text>
        )}
        <Pressable
          ref={inputRef}
          onPress={disabled ? () => {} : handlePress}
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
            {!!option && renderOption(option)}
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
            onDismiss={() => {
              setIsFocused(false)
              option === '' ? animateLabel(0) : undefined
            }}
            renderOption={renderOption}
            options={options}
            onSelectOption={(selectedOption) => {
              setOption(selectedOption)
              setIsFocused(false)
            }}
          />
        )}
      </View>
    </ThemeProvider>
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
