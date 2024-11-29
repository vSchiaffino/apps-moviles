import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import Typography from '@/components/Typography'
import DateSelect from '@/components/DateSelect'
import SelectDateModal from '@/pages/StockPage/SelectDateModal'
import StyledButton from '@/components/StyledButton'
import { useReportData } from '@/hooks/useReportData'
import InfoCard from '@/components/InfoCard'
import useOneShiftData from '@/hooks/useOneShiftData'

const GeneralReport = () => {
  const [selectedInitialDate, setSelectedInitialDate] = useState('')
  const [selectedFinalDate, setSelectedFinalDate] = useState('')
  const [initialModalVisible, setInitialModalVisible] = useState(false)
  const [finalModalVisible, setFinalModalVisible] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const { report } = useReportData(selectedInitialDate, selectedFinalDate)
  const sum = (array: number[]) => array.reduce((a, b) => a + b, 0)

const data = report
    ?.map((report) => ({
      label: new Date(report.startDate)
        .toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(',', ''),
      value: sum(report.missing.map((missing) => sum(missing.stock.map((s) => s.quantity)))),
      id: report.id,
    }))
    .filter((r) => r.value > 0)

  const [id, setId] = useState<number | undefined>(undefined)
  const { shift } = useOneShiftData(id)
  console.log('shift', shift)

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
        <View style={{ marginBottom: '5%' }}>
          <StyledButton label="Ver reportes" onPress={() => setShowReport(true)} />
        </View>
        {showReport && selectedInitialDate !== '' && selectedFinalDate !== '' ? (
          <View style={styles.chartContainer}>
            <Typography variant="subtitle" style={[styles.centeredText, { marginTop: 24 }]}>
              Comparación de Ventas y Disminución de Stock
            </Typography>
            <Typography variant="mini" style={styles.yAxisLabel}>
              Unidades por pérdida
            </Typography>
            <ScrollView style={styles.chartWrapper} horizontal={true}>
              {data && (
                <BarChart
                  data={data}
                  barWidth={40}
                  xAxisLabelTextStyle={{ fontSize: 10 }}
                  barBorderRadius={5}
                  frontColor="#4CAF50"
                  showXAxisIndices={true}
                  onPress={(value: any) => console.log(value)}
                />
              )}
              <Typography variant="body" style={styles.xAxisLabel}>
                Días
              </Typography>
            </ScrollView>
          </View>
        ) : (
          <InfoCard infoText="Seleccionar un rango de fechas para ver los reportes" />
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

export default GeneralReport