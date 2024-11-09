import { useEffect } from 'react'
import { useQuery } from 'react-query'

export function useWarehouses() {
  const create = async () => {}
  const fetchProducts = async () => {
    return [
      {
        id: 1,
        name: 'Depósito A',
        location: 'Alicia Moreau de Justo 1189',
        stock: 160,
        capacity: 165,
      },
      {
        id: 2,
        name: 'Depósito B',
        location: 'Alicia Moreau de Justo 1189',
        stock: 0,
        capacity: 165,
      },
      {
        id: 3,
        name: 'Depósito C',
        location: 'Alicia Moreau de Justo 1189',
        stock: 165,
        capacity: 165,
      },
      {
        id: 4,
        name: 'Depósito D',
        location: 'Alicia Moreau de Justo 1189',
        stock: 20,
        capacity: 165,
      },
      {
        id: 5,
        name: 'Depósito E',
        location: 'Alicia Moreau de Justo 1189',
        stock: 10,
        capacity: 165,
      },
    ]
  }
  const { data, ...restQuery } = useQuery('warehouses', () => fetchProducts())

  return { warehouses: data, create, ...restQuery }
}
