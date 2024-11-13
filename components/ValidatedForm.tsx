import { Controller, RegisterOptions, useForm, UseFormProps } from 'react-hook-form'
import OutlinedInput, { OutlinedInputProps } from './OutlinedInput'
import StyledButton from './StyledButton'
import React from 'react'
import { ApiValidationError } from '@/services/api.service'
import Typography from './Typography'
import { TextInput, TextInputProps } from 'react-native'
import OutlinedInputPassword from './OutlinedInputPassword'
import OutlinedSelect, { OutlinedSelectProps } from './OutlinedSelect/OutlinedSelect'
import InfoCard from './InfoCard'
import { Colors } from '@/constants/Colors'

export type ValidatedField = {
  name: string
  label: string
  password?: boolean
  disabled?: boolean
  rules: RegisterOptions<any>
  component?: 'input' | 'input-password' | 'select'
  inputProps?: Partial<OutlinedInputProps | OutlinedSelectProps>
}

export interface ValidatedFormProps {
  formProps?: UseFormProps
  onSubmit: (form: any) => Promise<void>
  onFormChange?: (name: string, value: any) => void
  submitLabel?: string
  fields: ValidatedField[]
  successMessage?: string
}

const ValidatedForm = ({
  formProps,
  fields,
  onSubmit,
  onFormChange,
  successMessage = '',
  submitLabel = 'Enviar',
}: ValidatedFormProps) => {
  const refs: TextInput[] = []
  const { control, handleSubmit, formState, setError, clearErrors, setFocus } = useForm(formProps)

  const { errors, isSubmitSuccessful } = formState
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
        const components = {
          input: OutlinedInput,
          'input-password': OutlinedInputPassword,
          select: OutlinedSelect,
        }
        const Component = components[component] as any
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
                onChangeText={(value: any) => {
                  onFormChange && onFormChange(name, value)
                  clearErrors()
                  onChange(value)
                }}
                value={value}
                option={value}
                setOption={(value: any) => {
                  onFormChange && onFormChange(name, value)
                  clearErrors()
                  onChange(value)
                }}
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
        <InfoCard
          infoText={errors.form.message as string}
          backgroundColor={Colors.danger[200]}
          textColor={Colors.danger[900]}
          iconColor={Colors.danger[700]}
        />
      )}
      {isSubmitSuccessful && successMessage && <InfoCard infoText={successMessage} />}
    </>
  )
}

export default ValidatedForm
