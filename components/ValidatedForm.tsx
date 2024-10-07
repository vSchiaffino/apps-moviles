import {
  Controller,
  RegisterOptions,
  useForm,
  UseFormProps,
} from 'react-hook-form'
import OutlinedInput from './OutlinedInput'
import StyledButton from './StyledButton'
import React from 'react'
import { ApiValidationError } from '@/services/api.service'
import Typography from './Typography'

export type ValidatedField = {
  name: string
  label: string
  password?: boolean
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
  const { control, handleSubmit, formState, setError } = useForm(formProps)
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
      {fields.map(({ name, label, password, rules }) => (
        <Controller
          key={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <OutlinedInput
              errorMessage={errors[name]?.message as string}
              secureTextEntry={password}
              label={label}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={name}
        />
      ))}
      <StyledButton label={submitLabel} onPress={handleSubmit(submitWrapper)} />
      {errors.form && (
        <Typography variant='body' color='danger'>
          {errors.form.message as string}
        </Typography>
      )}
    </>
  )
}

export default ValidatedForm
