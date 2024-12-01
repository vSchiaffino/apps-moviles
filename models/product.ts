export interface StoredIn {
  id: number
  quantity: number
  warehouse: Warehouse
}

export interface Product {
  id: number
  name: string
  storedIn: StoredIn[]
}
