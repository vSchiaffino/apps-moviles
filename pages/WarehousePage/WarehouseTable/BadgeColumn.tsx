import React from 'react'
import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'

export interface BadgeColumnProps {
  row: any
}

const BadgeColumn = ({ row }: BadgeColumnProps) => {
  const colorSchemeByState = {
    full: Colors.danger,
    almostFull: Colors.yellow,
    ok: Colors.primary,
  }
  const badgeTextByState = {
    full: 'FULL',
    almostFull: 'AF',
    ok: 'OK',
  }
  const state = row.state as 'full' | 'almostFull' | 'ok'
  const colorScheme = colorSchemeByState[state]
  const backgroundColor = state === 'ok' ? Colors.primary[200] : colorScheme[100]
  return (
    <Typography
      key={row.id}
      variant="mini"
      justify="center"
      style={{
        backgroundColor,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 16,
        width: 45,
        color: colorScheme[600],
      }}
    >
      {badgeTextByState[state]}
    </Typography>
  )
}

export default BadgeColumn
