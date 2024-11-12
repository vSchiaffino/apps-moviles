import React from 'react'
import RegisterPage from '@/pages/RegisterPage'
import { useNotAuthorizedUser } from '@/hooks/useUser'

export default function () {
  useNotAuthorizedUser()
  return <RegisterPage />
}
