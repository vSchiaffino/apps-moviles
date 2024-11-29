import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Pressable, useColorScheme } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars'
import { Colors } from '@/constants/Colors'
import Typography from './Typography'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

export interface DateSelectProps {
  label: string
  value: string
  onChange: (date: string) => void
  onPressIcon: () => void
  error?: boolean
  errorMessage?: string
  disabled?: boolean
}

const DateSelect: React.FC<DateSelectProps> = ({
  label,
  value,
  onChange,
  onPressIcon,
  error = false,
  errorMessage = '',
  disabled = false,
}) => {
  const scheme = useColorScheme()
  const [isFocused, setIsFocused] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current

  const showError = error === true || errorMessage !== ''
  const isEmpty = value === ''

  const labelPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [19, -7],
  })

  const handleDayPress = (day: any) => {
    onChange(day.dateString)
    setIsFocused(false)
  }

  const animateLabel = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.label,
            {
              backgroundColor: DefaultTheme.colors.background,
              zIndex: isFocused || !isEmpty ? 1 : -1,
              color: disabled
                ? Colors.gray[500]
                : showError
                  ? Colors.danger[600]
                  : isFocused
                    ? Colors.primary[600]
                    : Colors.gray[900],
            },
            isEmpty
              ? {
                  transform: [{ translateY: labelPosition }],
                }
              : {
                  transform: [{ translateY: -7 }],
                },
          ]}
        >
          {label}
        </Animated.Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="date-range"
            size={24}
            color={Colors.gray[900]}
            style={styles.icon}
            onPress={onPressIcon}
          />
          <Pressable
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
            onPress={onPressIcon}
          >
            <Text style={styles.inputText}>{value || 'Seleccionar fecha'}</Text>
          </Pressable>
        </View>

        {showError && errorMessage && (
          <Typography variant="subtitle" color="danger">
            {errorMessage}
          </Typography>
        )}

        {isFocused && (
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{ [value]: { selected: true, selectedColor: 'blue' } }}
              monthFormat={'yyyy MMMM'}
            />
          </View>
        )}
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: '5%',
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    position: 'absolute',
    left: 50,
    zIndex: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 4,
  },
  input: {
    backgroundColor: DefaultTheme.colors.background,
    position: 'relative',
    borderRadius: 8,
    paddingTop: 12,
    paddingRight: 40,
    paddingBottom: 12,
    paddingLeft: 15,
    marginBottom: 5,
    flex: 1,
  },
  inputText: {
    fontSize: 16,
    color: Colors.gray[900],
  },
  calendarContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    borderRadius: 8,
    elevation: 10,
    padding: 20,
  },
})

export default DateSelect
