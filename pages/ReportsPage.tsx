import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import Typography from '@/components/Typography'
import DateSelect from '@/components/DateSelect'
import SelectDateModal from './StockPage/SelectDateModal'
import StyledButton from '@/components/StyledButton'
import { Colors } from '@/constants/Colors'
import { useReportData } from '@/hooks/useReportData'
import InfoCard from '@/components/InfoCard'

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

const ReportsScreen = () => {
  const [selectedInitialDate, setSelectedInitialDate] = useState('')
  const [selectedFinalDate, setSelectedFinalDate] = useState('')
  const [initialModalVisible, setInitialModalVisible] = useState(false)
  const [finalModalVisible, setFinalModalVisible] = useState(false)
  const [data, setData] = useState<APIResponse | null>(null)
  const [showReport, setShowReport] = useState(false)
  const { report } = useReportData(selectedInitialDate, selectedFinalDate)
  const [availableDates, setAvailableDates] = useState<string[]>([])

  if (data !== null) {
    setAvailableDates(data.sales.map((sale) => sale.date))
  }

  const processDataForCharts = () => {
    if (!report) return { barData: [], lineData: [] }

    let barData: any[] = []
    let lineData: any[] = []

    report.sales.forEach((sale) => {
      const stockOnSaleDate = report.stockLevels.filter((stock) => stock.date === sale.date)

      if (stockOnSaleDate.length === 0) {
        return
      }

      let totalSales = sale.products.reduce((sum: any, product: any) => sum + product.quantity, 0)
      var totalLosses = 0

      stockOnSaleDate.forEach((stock) => {
        stock.products.forEach((product) => {
          const stockChange = product.initialStock - product.finalStock
          const actualSales =
            sale.products.find((p) => p.productId == (product.productId as any))?.quantity || 0
          const validLoss = stockChange >= actualSales ? stockChange - actualSales : 0
          totalLosses += validLoss
        })
      })

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
    <ScrollView style={{ backgroundColor: Colors.gray[100] }}>
      <View style={{ padding: 16 }}>
        <DateSelect
          label="Fecha inicio"
          value={selectedInitialDate}
          onChange={() => {
            setSelectedInitialDate
            setShowReport(false)
          }}
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
          onChange={() => {
            setSelectedFinalDate
            setShowReport(false)
          }}
          onPressIcon={() => setFinalModalVisible(true)}
        />
        <SelectDateModal
          selectedDate={selectedFinalDate}
          setSelectedDate={setSelectedFinalDate}
          visible={finalModalVisible}
          setVisible={setFinalModalVisible}
        />
        <StyledButton
          label="Ver reportes"
          onPress={() => {
            setShowReport(true)
            console.log(report)
            console.log(report !== undefined ? report.stockLevels.map((info) => info.products) : '')
          }}
        />
        <View style={styles.chartContainer}>
          {report !== undefined && showReport ? (
            <>
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
            </>
          ) : report !== undefined && report.sales.length === 0 ? (
            <InfoCard infoText="No se registraron ventas en esas fechas" />
          ) : report !== undefined && report.stockLevels.length === 0 ? (
            <InfoCard infoText="No se registraron cambios en el stock en esas fechas" />
          ) : (
            <InfoCard infoText="No hay reportes para esas fechas" />
          )}
        </View>
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

export default ReportsScreen
