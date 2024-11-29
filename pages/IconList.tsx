import React from 'react'
import IconButton from '@/components/IconButton'
import { GestureResponderEvent, View, ViewStyle } from 'react-native'
import { Spacing } from '@/constants/Spacing'
import { Colors } from '@/constants/Colors'

export interface IconProps {
  icons: Icon[]
  style?: ViewStyle
}

export interface Icon {
  icon: string
  onPress?: (event: GestureResponderEvent) => void
  mode?: string
  library?: string
  disabled?: boolean
}

const IconList = ({ icons, style }: IconProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: Spacing.rowGap,
        padding: 16,
        paddingRight: 30,
        ...style,
      }}
    >
      {icons.map(({ icon, onPress, mode = 'opacity', library, disabled }, index) => (
        <IconButton
          disabled={disabled}
          key={index}
          library={library as any}
          mode={mode as any}
          color={Colors.gray[800]}
          style={{ backgroundColor: 'transparent' }}
          icon={icon}
          size={24}
          onPress={onPress}
          hitSlop={20}
        />
      ))}
    </View>
  )
}

export default IconList
