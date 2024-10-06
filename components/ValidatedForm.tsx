import {
  Controller,
  RegisterOptions,
  useForm,
  UseFormProps,
} from 'react-hook-form'
import OutlinedInput from './OutlinedInput'
import StyledButton from './StyledButton'
import React from 'react'

export type ValidatedField = {
  name: string
  label: string
  rules: RegisterOptions<any>
}

export interface ValidatedFormProps {
  formProps?: UseFormProps
  onSubmit: (form: any) => void
  submitLabel?: string
  fields: ValidatedField[]
}

const ValidatedForm = ({
  formProps,
  fields,
  onSubmit,
  submitLabel = 'Enviar',
}: ValidatedFormProps) => {
  const { control, handleSubmit, formState } = useForm(formProps)
  const { errors } = formState
  return (
    <>
      {fields.map(({ name, label, rules }) => (
        <Controller
          key={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <OutlinedInput
              errorMessage={errors[name]?.message as string}
              label={label}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={name}
        />
      ))}
      <StyledButton label={submitLabel} onPress={handleSubmit(onSubmit)} />
    </>
  )
}

export default ValidatedForm
