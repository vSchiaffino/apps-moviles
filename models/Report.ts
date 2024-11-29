interface Product {
  id: number
  name: string
}

interface StockProduct {
  initialStock: number
  finalStock: number
  product: Product
  productId: number
}

interface StockLevel {
  date: string
  products: StockProduct[]
}

interface SaleProduct {
  productId: string
  quantity: number
}

interface Sale {
  date: string
  products: SaleProduct[]
}

interface Product {
  id: number
  name: string
}

interface StockItem {
  quantity: number
  productId: number
  product: Product
}

interface WarehouseStock {
  stock: StockItem[]
  warehouseId: number
  warehouse: Warehouse
}

interface Warehouse {
  id: number
  name: string
  capacity: number
  stock: StockItem[]
}

interface Report {
  id: number
  startDate: string
  startStock: WarehouseStock[]
  endDate: string
  endStock: WarehouseStock[]
  missing: WarehouseStock[]
}
