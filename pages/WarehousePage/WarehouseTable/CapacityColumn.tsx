import React from 'react'
import { Colors } from '@/constants/Colors'
import Typography from '@/components/Typography'

const CapacityColumn: React.FC<{ row: any }> = ({ row }) => {
  const colorSchemeByState = {
    full: Colors.danger,
    almostFull: Colors.yellow,
    ok: Colors.gray,
  }
  const state = row.state as 'full' | 'almostFull' | 'ok'
  const colorScheme = colorSchemeByState[state]
  const color = colorScheme[600]
  const { stockNumber, capacity } = row
  return (
    <Typography key={row} variant="body" style={{ color }} justify="center">
      {stockNumber}
      <Typography key={row} variant="mini" style={{ color }}>
        {'/'}
        {capacity}
      </Typography>
    </Typography>
  )
}

export default CapacityColumn
