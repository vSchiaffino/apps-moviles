import { View, Animated, Pressable, Modal } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Typography from '../Typography'
import usePressOptionAnimation from './usePressOptionAnimation'

export interface SelectItemProps {
  inputMeasures: { top: number; left: number; width: number }
  options: string[]
  onSelectOption: (option: string) => void
  onDismiss: () => void
}

const SelectItems: React.FC<SelectItemProps> = ({
  options,
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
              paddingTop: 5,
              display: 'flex',
              backgroundColor: 'white',
              rowGap: 20,
              maxHeight: 200,
              width: width,
              top: top + 14,
              left,
              borderRadius: 10,
            }}
          >
            {options.map((option) => (
              <Pressable
                key={option}
                onPressIn={() => handlePressIn(option)}
                onPressOut={handlePressOut}
                onPress={(e) => {
                  console.log('press', e)
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
                    {option}
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
