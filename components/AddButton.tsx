import { TouchableOpacityProps } from 'react-native'
import React from 'react'
import IconButton from './IconButton'

export interface AddButtonProps extends TouchableOpacityProps {
  label?: string
}

const AddButton: React.FC<AddButtonProps> = ({ ...rest }) => {
  return <IconButton icon="add-circle-outline" {...rest} />
}

export default AddButton
