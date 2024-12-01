export interface StockItem {
  id: number
  quantity: number
  product: Product
}

export interface Warehouse {
  id: number
  name: string
  capacity: number
  stock: StockItem[]
}
