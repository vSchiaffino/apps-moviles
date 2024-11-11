import { Pressable, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import Typography from './Typography'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TouchableHighlight } from 'react-native-gesture-handler'

export interface AddButtonProps extends TouchableOpacityProps {
  label?: string
  icon?: string
  library?: 'Ionicons' | 'mui'
  color?: string
  size?: number
  mode?: 'opacity' | 'highlight'
}

const IconButton: React.FC<AddButtonProps> = ({
  label,
  mode,
  library = 'Ionicons',
  style,
  icon,
  color = 'black',
  size,
  ...rest
}) => {
  const MainComponent: any =
    mode === 'opacity' ? TouchableOpacity : mode === 'highlight' ? TouchableHighlight : Pressable
  return (
    <MainComponent
      style={[
        {
          flexDirection: 'row',
          backgroundColor: Colors.primary[600],
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
        },
        style,
      ]}
      {...rest}
    >
      <>
        {library === 'Ionicons' && <Ionicons name={icon as any} size={size} color={color} />}
        {library === 'mui' && <MaterialIcons name={icon as any} size={size} color={color} />}
        {label !== undefined && (
          <Typography variant="subtitle" color="light" style={{ textAlign: 'center' }}>
            {label}
          </Typography>
        )}
      </>
    </MainComponent>
  )
}

export default IconButton
