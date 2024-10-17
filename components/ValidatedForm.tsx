import { Controller, RegisterOptions, useForm, UseFormProps } from 'react-hook-form'
import OutlinedInput from './OutlinedInput'
import StyledButton from './StyledButton'
import React from 'react'
import { ApiValidationError } from '@/services/api.service'
import Typography from './Typography'
import { TextInput, TextInputProps } from 'react-native'
import OutlinedInputPassword from './OutlinedInputPassword'

export type ValidatedField = {
  name: string
  label: string
  rules: RegisterOptions<any>
  component?: 'input' | 'input-password'
  disabled?: boolean
  inputProps?: TextInputProps
}

export interface ValidatedFormProps {
  formProps?: UseFormProps
  onSubmit: (form: any) => Promise<void>
  submitLabel?: string
  fields: ValidatedField[]
}

const ValidatedForm = ({
  formProps,
  fields,
  onSubmit,
  submitLabel = 'Enviar',
}: ValidatedFormProps) => {
  const refs: TextInput[] = []
  const { control, handleSubmit, formState, setError, clearErrors, setFocus } = useForm(formProps)
  const { errors } = formState
  const submitWrapper = async (form: any) => {
    try {
      await onSubmit(form)
    } catch (error) {
      if (error instanceof ApiValidationError) {
        setError(error.field || 'form', {
          message: error.message,
          type: 'server',
        })
      } else {
        throw error
      }
    }
  }
  return (
    <>
      {fields.map(({ name, label, disabled, rules, inputProps, component = 'input' }, index) => {
        const Component = component === 'input' ? OutlinedInput : OutlinedInputPassword
        return (
          <Controller
            key={name}
            control={control}
            rules={rules}
            disabled={disabled}
            render={({ field: { onChange, onBlur, value, disabled } }) => (
              <Component
                blurOnSubmit={false}
                inputRef={(input: TextInput) => {
                  refs[index] = input
                }}
                onSubmitEditing={() => {
                  const isLastInput = index === fields.length - 1
                  if (isLastInput) {
                    handleSubmit(submitWrapper)()
                  } else {
                    const input = refs[index + 1]
                    if (input) refs[index + 1].focus()
                  }
                }}
                returnKeyType={index === fields.length - 1 ? 'send' : 'next'}
                disabled={disabled}
                errorMessage={errors[name]?.message as string}
                label={label}
                onBlur={onBlur}
                onChangeText={(value) => {
                  clearErrors()
                  onChange(value)
                }}
                value={value}
                {...inputProps}
              />
            )}
            name={name}
          />
        )
      })}
      <StyledButton
        label={submitLabel}
        onPress={handleSubmit(submitWrapper)}
        disabled={errors && Object.entries(errors).length > 0}
      />
      {errors.form && (
        <Typography variant="body" color="danger">
          {errors.form.message as string}
        </Typography>
      )}
    </>
  )
}

export default ValidatedForm
