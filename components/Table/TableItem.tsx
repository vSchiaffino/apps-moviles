import React from 'react'
import Typography from '../Typography'
import { TableColumn } from './Table'

const TableItem: React.FC<{ row: any; column: TableColumn }> = ({ row, column }) => {
  const { key, align, font, component, render } = column
  if (component) return React.createElement(component, { row })
  if (render) return render(row)

  return (
    <Typography
      justify={align && (align === 'flex-start' ? 'left' : align === 'center' ? 'center' : 'right')}
      font={font}
      key={key}
      variant="body"
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{ width: '100%' }}
    >
      {row[key]}
    </Typography>
  )
}

export default TableItem
