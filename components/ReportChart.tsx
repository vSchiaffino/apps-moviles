import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Typography from '@/components/Typography';
import DateSelect from '@/components/DateSelect';
import SelectDateModal from '@/pages/StockPage/SelectDateModal';
import StyledButton from '@/components/StyledButton';
import InfoCard from '@/components/InfoCard';

type ChartData = {
  label: string;
  value: number;
  id?: string | number;
};

type ReportComponentProps = {
  useReportHook: (initialDate: string, finalDate: string) => { report: any }; 
  calculateData: (report: any) => ChartData[];
  subtitle: string;
  xAxisLabel: string;
  yAxisLabel: string;
};

const ReportChart: React.FC<ReportComponentProps> = ({
  useReportHook,
  calculateData,
  subtitle,
  xAxisLabel,
  yAxisLabel,
}) => {
  const [selectedInitialDate, setSelectedInitialDate] = useState('');
  const [selectedFinalDate, setSelectedFinalDate] = useState('');
  const [initialModalVisible, setInitialModalVisible] = useState(false);
  const [finalModalVisible, setFinalModalVisible] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const { report } = useReportHook(selectedInitialDate, selectedFinalDate);

  const data = calculateData(report);

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
              {subtitle}
            </Typography>
            <Typography variant="mini" style={styles.yAxisLabel}>
              {yAxisLabel}
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
                {xAxisLabel}
              </Typography>
            </ScrollView>
          </View>
        ) : (
          <InfoCard infoText="Seleccionar un rango de fechas para ver los reportes" />
        )}
      </View>
    </ScrollView>
  );
};

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
});

export default ReportChart;