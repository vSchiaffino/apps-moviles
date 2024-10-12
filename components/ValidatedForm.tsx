import { Controller, RegisterOptions, useForm, UseFormProps } from 'react-hook-form'
import OutlinedInput from './OutlinedInput'
import StyledButton from './StyledButton'
import React from 'react'
import { ApiValidationError } from '@/services/api.service'
import Typography from './Typography'

export type ValidatedField = {
  name: string
  label: string
  password?: boolean
  disabled?: boolean
  rules: RegisterOptions<any>
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
  const { control, handleSubmit, formState, setError, clearErrors } = useForm(formProps)
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
      {fields.map(({ name, label, password, disabled, rules }) => (
        <Controller
          key={name}
          control={control}
          rules={rules}
          disabled={disabled}
          render={({ field: { onChange, onBlur, value, disabled} }) => (
            <OutlinedInput
              disabled={disabled}
              errorMessage={errors[name]?.message as string}
              secureTextEntry={password}
              label={label}
              onBlur={onBlur}
              onChangeText={(value) => {
                clearErrors()
                onChange(value)
              }}
              value={value}
            />
          )}
          name={name}
        />
      ))}
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
