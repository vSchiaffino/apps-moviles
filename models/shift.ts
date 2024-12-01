export interface Shift {
  id: number
  startDate: string
  endDate: string | null
  endStock: any | null
  missing: any | null
  egresses: Egress[]
}

export interface Egress {
  id: number
  quantity: number
  createdAt: string
  product: Product
  warehouse: Warehouse
}
