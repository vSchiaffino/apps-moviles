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
    start: async () => {
      await shiftService.start()
      refetch()
    },
    end: async () => {
      await shiftService.endCurrent()
      refetch()
    },
  }
}
