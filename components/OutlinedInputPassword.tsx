import React, { useState } from 'react'
import OutlinedInput, { OutlinedInputProps } from './OutlinedInput'

const OutlinedInputPassword = (props: OutlinedInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <>
      <OutlinedInput
        {...props}
        secureTextEntry={!showPassword}
        iconRight={showPassword ? 'eye' : 'eye-off'}
        onPressIconRight={() => setShowPassword(!showPassword)}
      />
    </>
  )
}

export default OutlinedInputPassword
