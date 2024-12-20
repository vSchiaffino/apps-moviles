import shiftService from '@/services/shifts.service'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { io } from 'socket.io-client'

export default function useShift() {
  const { data, refetch, remove, ...rest } = useQuery(['shift'], () => shiftService.getActive(), {
    initialData: undefined,
    cacheTime: 0,
  })

  useEffect(() => {
    const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL)
    socket.on('shiftChange', () => {
      refetch()
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return {
    ...rest,
    shift: data,
    start: async (stocks: any[]) => {
      await shiftService.start(
        stocks.map((stock) => ({
          warehouseId: stock.warehouseId,
          stock: stock.stock.map(({ product, quantity }: any) => ({
            productId: product.id,
            quantity,
          })),
        })),
      )
      refetch()
    },
    end: async (stocks: any[]) => {
      await shiftService.endCurrent(
        stocks.map((stock) => ({
          warehouseId: stock.warehouseId,
          stock: stock.stock.map(({ product, quantity }: any) => ({
            productId: product.id,
            quantity,
          })),
        })),
      )
      refetch()
    },
    registerEgress: async (egress: any) => {
      await shiftService.registerEgress({
        productId: Number(egress.productId),
        warehouseId: Number(egress.warehouseId),
        quantity: Number(egress.quantity),
      })
    },
  }
}
