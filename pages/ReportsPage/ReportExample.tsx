import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import Typography from '@/components/Typography'
import DateSelect from '@/components/DateSelect'
import SelectDateModal from '@/pages/StockPage/SelectDateModal'
import StyledButton from '@/components/StyledButton'
import { useReportData } from '@/hooks/useReportData'

interface Sale {
  productId: string
  quantity: number
}

interface ProductStock {
  productId: string
  initialStock: number
  finalStock: number
}

interface APIResponse {
  sales: { date: string; products: Sale[] }[]
  stockLevels: { date: string; products: ProductStock[] }[]
}

const ReportExample = () => {
  const [selectedInitialDate, setSelectedInitialDate] = useState('')
  const [selectedFinalDate, setSelectedFinalDate] = useState('')
  const [initialModalVisible, setInitialModalVisible] = useState(false)
  const [finalModalVisible, setFinalModalVisible] = useState(false)
  const [data, setData] = useState<APIResponse | null>(null)
  const [showReport, setShowReport] = useState(false)
  const { report } = useReportData(selectedInitialDate, selectedFinalDate)

  const processDataForCharts = () => {
    if (!report) return { barData: [], lineData: [] }

    let barData: any[] = []
    let lineData: any[] = []

    // Pérdidas por fecha
    report.sales.forEach((sale) => {
      // Filtrar los registros de stock para la fecha de la venta
      const stockOnSaleDate = report.stockLevels.filter((stock) => stock.date === sale.date)

      // Si no hay registros de stock para esa fecha, no se procesan las pérdidas
      if (stockOnSaleDate.length === 0) {
        return // No hay stock para esta fecha, por lo que no se cuentan pérdidas
      }

      let totalSales = sale.products.reduce((sum: any, product: any) => sum + product.quantity, 0)
      let totalLosses = 0

      // Comparar ventas con stock para cada producto en la fecha de venta
      stockOnSaleDate.forEach((stock) => {
        stock.products.forEach((product) => {
          const stockChange = product.initialStock - product.finalStock
          const actualSales =
            sale.products.find((p) => p.productId == (product.productId as any))?.quantity || 0
          const validLoss = stockChange >= actualSales ? stockChange - actualSales : 0
          totalLosses += validLoss
        })
      })

      // Si hubo una pérdida, se agrega al gráfico de barras
      if (totalLosses > 0) {
        barData.push({
          label: sale.date,
          value: totalLosses,
        })
      }
    })

    return { barData, lineData }
  }

  const { barData, lineData } = processDataForCharts()

  const screenWidth = Dimensions.get('window').width
  const barWidth = 30
  const chartWidth = Math.min(barData.length * barWidth, screenWidth * 0.8)
  const maxDays = 5
  const displayedData = barData.slice(-maxDays)

  return (
    <ScrollView style={{ height: '100%' }}>
      <View style={{ padding: 16 }}>
        <DateSelect
          label="Fecha inicio"
          value={selectedInitialDate}
          onChange={setSelectedInitialDate}
          onPressIcon={() => setInitialModalVisible(true)}
        />
        <SelectDateModal
          selectedDate={selectedInitialDate}
          setSelectedDate={setSelectedInitialDate}
          visible={initialModalVisible}
          setVisible={setInitialModalVisible}
        />

        <DateSelect
          label="Fecha final"
          value={selectedFinalDate}
          onChange={setSelectedFinalDate}
          onPressIcon={() => setFinalModalVisible(true)}
        />
        <SelectDateModal
          selectedDate={selectedFinalDate}
          setSelectedDate={setSelectedFinalDate}
          visible={finalModalVisible}
          setVisible={setFinalModalVisible}
        />
        <StyledButton label="Ver reportes" onPress={() => setShowReport(true)} />
        {showReport && (
          <View style={styles.chartContainer}>
            <Typography variant="subtitle" style={[styles.centeredText, { marginTop: 24 }]}>
              Comparación de Ventas y Disminución de Stock
            </Typography>
            <Typography variant="mini" style={styles.yAxisLabel}>
              Unidades por pérdida
            </Typography>
            <ScrollView style={styles.chartWrapper} horizontal={true}>
              <BarChart
                data={displayedData.map((item) => ({ value: item.value, label: item.label }))}
                barWidth={chartWidth}
                barBorderRadius={4}
                frontColor="#3498db"
                height={200}
                yAxisThickness={2}
                yAxisTextStyle={{ color: '#000', fontSize: 12 }}
                stepValue={3}
              />
              <Typography variant="body" style={styles.xAxisLabel}>
                Días
              </Typography>
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
  chartContainer: {
    marginTop: 20,
  },
  yAxisLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  chartWrapper: {
    //alignItems: 'center',
    marginVertical: 20,
  },
  xAxisLabel: {
    position: 'absolute',
    bottom: -20,
    fontSize: 14,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 350,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
})

export default ReportExample