import stockLevelService from '@/services/stock-level.service'
import { useQuery } from 'react-query'
import useProducts from './useProducts'
import { useEffect, useState } from 'react'

export default function useStockLevel(date: string) {
  const [message, setMessage] = useState('')
  const [editingStockLevel, setEditingStockLevel] = useState<any[] | null>(null)
  const { products } = useProducts({ page: 1, limit: 1000 }, { field: 'name', direction: 'ASC' })
  const { data, refetch } = useQuery(
    ['stockLevels', date],
    () => {
      if (date === '') return undefined
      return stockLevelService.getByDate(date)
    },
    {
      initialData: undefined,
      cacheTime: 0,
    },
  )
  useEffect(() => {
    setMessage('')
  }, [date])

  useEffect(() => {
    if (data === undefined) return
    if (data === null) {
      setEditingStockLevel(
        products.map((product: any) => ({
          id: product.id,
          product: product,
          initialStock: '0',
          finalStock: '0',
        })),
      )
      return
    }

    setEditingStockLevel(data.products)
  }, [data])

  return {
    // Si es stocks leves es undefined es que todavian no lo fetcheo, si es null
    // lo fetcheo y no hay ninguno registrado para esa fecha
    stockLevels: data,
    editingStockLevel: editingStockLevel,
    setEditing: setEditingStockLevel,
    isEditing: data !== null,
    save: async () => {
      const entity = {
        products: editingStockLevel?.map((stockLevel) => ({
          productId: stockLevel.product.id,
          initialStock: parseInt(stockLevel.initialStock),
          finalStock: parseInt(stockLevel.finalStock),
        })),
      }
      if (data !== null) {
        await stockLevelService.edit(data.id, entity)
      } else {
        await stockLevelService.create({ date, ...entity })
      }
      await refetch()
      setMessage('Registro de stock guardado')
    },
    message,
  }
}
