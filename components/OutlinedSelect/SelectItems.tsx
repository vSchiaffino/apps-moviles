import { View, Animated, Pressable, Modal } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Typography from '../Typography'
import usePressOptionAnimation from './usePressOptionAnimation'
import { Colors } from '@/constants/Colors'

export interface SelectItemProps {
  inputMeasures: { top: number; left: number; width: number }
  options: any[]
  renderOption: (option: any) => string
  onSelectOption: (option: any) => void
  onDismiss: () => void
}

const SelectItems: React.FC<SelectItemProps> = ({
  options,
  renderOption,
  onSelectOption,
  onDismiss,
  inputMeasures: { top, left, width },
}) => {
  const { handlePressIn, handlePressOut, pressedInOption, backgroundColor } =
    usePressOptionAnimation()
  return (
    <Modal transparent={true}>
      <Pressable style={{ height: '100%', width: '100%' }} onPress={onDismiss}>
        <View style={{ position: 'relative' }}>
          <ScrollView
            showsVerticalScrollIndicator
            style={{
              padding: 5,
              display: 'flex',
              backgroundColor: 'white',
              rowGap: 20,
              maxHeight: 200,
              width: width,
              top: top + 14,
              left,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.gray[200],
            }}
          >
            {options.map((option) => (
              <Pressable
                key={renderOption(option)}
                onPressIn={() => handlePressIn(option)}
                onPressOut={handlePressOut}
                onPress={(e) => {
                  e.preventDefault()
                  onSelectOption(option)
                }}
              >
                <Animated.View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    backgroundColor: pressedInOption === option ? backgroundColor : 'transparent',
                  }}
                >
                  <Typography variant="body" color="dark">
                    {renderOption(option)}
                  </Typography>
                </Animated.View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  )
}

export default SelectItems
