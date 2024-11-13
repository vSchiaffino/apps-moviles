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

interface ReportData {
  stockLevels: StockLevel[]
  sales: Sale[]
}
