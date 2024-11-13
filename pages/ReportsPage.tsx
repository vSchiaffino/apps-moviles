import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import Modal from 'react-native-modal';
import Typography from '@/components/Typography';
import IconSelect from '@/components/IconSelect';
import DateSelect from '@/components/DateSelect';
import { Calendar } from 'react-native-calendars';

interface Sale {
  productId: string;
  quantity: number;
}

interface ProductStock {
  productId: string;
  initial: number;
  final: number;
  date: string;
}

interface APIResponse {
  sales: { date: string; products: Sale[] }[];
  stockLevels: ProductStock[];
}

const ReportsScreen = () => {
  const [selectedInitialDate, setSelectedInitialDate] = useState('');
  const [selectedFinalDate, setSelectedFinalDate] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [initialModalVisible, setInitialModalVisible] = useState(false);
  const [finalModalVisible, setFinalModalVisible] = useState(false);
  const [data, setData] = useState<APIResponse | null>(null);

  const handleInitialDayPress = (day: any) => {
    setSelectedInitialDate(day.dateString);
    setInitialModalVisible(false);
  };

  const handleFinalDayPress = (day: any) => {
    setSelectedFinalDate(day.dateString);
    setFinalModalVisible(false);
  };

  const handleWarehouseChange = (warehouse: string) => setSelectedWarehouse(warehouse);

  const fetchData = async () => {
    const mockData: APIResponse = {
      sales: [
        { date: '2024-11-01', products: [{ productId: 'A', quantity: 10 }, { productId: 'B', quantity: 5 }] },
        { date: '2024-11-07', products: [{ productId: 'A', quantity: 5 }, { productId: 'B', quantity: 8 }] },
        { date: '2024-11-14', products: [{ productId: 'C', quantity: 2 }, { productId: 'B', quantity: 2 }] }
      ],
      stockLevels: [
        { productId: 'A', initial: 100, final: 80, date: '2024-11-01' },
        { productId: 'B', initial: 50, final: 40, date: '2024-11-01' },
        { productId: 'A', initial: 80, final: 60, date: '2024-11-07' },
        { productId: 'B', initial: 50, final: 45, date: '2024-11-07' },
        { productId: 'C', initial: 10, final: 8, date: '2024-11-14' },
        { productId: 'B', initial: 45, final: 40, date: '2024-11-14' }
      ]
    };
  
    setData(mockData);
  };

  useEffect(() => {
    fetchData();
  }, [selectedInitialDate, selectedFinalDate, selectedWarehouse]);

  const processDataForCharts = () => {
    if (!data) return { barData: [], lineData: [] };
  
    let barData: any[] = [];
    let lineData: any[] = [];
  
    // Pérdidas por fecha
    data.sales.forEach((sale) => {
      const stockOnSaleDate = data.stockLevels.filter((stock) => stock.date === sale.date);
      let totalSales = sale.products.reduce((sum, product) => sum + product.quantity, 0);
      let totalLosses = 0;
  
      // Comparar ventas con stock para cada producto en la fecha de venta
      stockOnSaleDate.forEach((stock) => {
        const stockChange = stock.initial - stock.final;
  
        // Verificar si las ventas superan la diferencia de stock
        const actualSales = sale.products.find(product => product.productId === stock.productId)?.quantity || 0;
        const validLoss = stockChange >= actualSales ? stockChange - actualSales : 0;
  
        totalLosses += validLoss;
      });
  
      // Si hubo una pérdida, se agrega al gráfico de barras
      if (totalLosses > 0) {
        barData.push({
          label: sale.date,
          value: totalLosses,
        });
      }
    });
  
    return { barData, lineData };
  };
  
  const { barData, lineData } = processDataForCharts();

  const screenWidth = Dimensions.get('window').width;
  const barWidth = 30;
  const chartWidth = Math.min(barData.length * barWidth, screenWidth * 0.8);
  const maxDays = 5;
  const displayedData = barData.slice(-maxDays);


  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Typography variant="h5" color="primary" style={[styles.centeredText, { marginTop: 40 }]}>
          Reportes de Ventas y Stock
        </Typography>
        
        <DateSelect
          label=""
          value={selectedInitialDate}
          onChange={setSelectedInitialDate}
          onPressIcon={() => setInitialModalVisible(true)}
        />
        <Modal
          isVisible={initialModalVisible}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          useNativeDriverForBackdrop={true}
          backdropOpacity={0.7}
          hasBackdrop={true}
          onBackdropPress={() => setInitialModalVisible(false)}
          onBackButtonPress={() => setInitialModalVisible(false)}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={styles.modalContent}>
            <Calendar
              style={{ backgroundColor: 'transparent' }}
              onDayPress={handleInitialDayPress}
              markedDates={{ [selectedInitialDate]: { selected: true, selectedColor: 'blue' } }}
              monthFormat={'yyyy MMMM'}
            />
            <Pressable onPress={() => setInitialModalVisible(false)} style={styles.closeButton}>
              <Typography variant="h6" style={{ color: 'white' }}>Cerrar</Typography>
            </Pressable>
          </View>
        </Modal>

        <DateSelect
          label=""
          value={selectedFinalDate}
          onChange={setSelectedFinalDate}
          onPressIcon={() => setFinalModalVisible(true)}
        />
        
        <IconSelect
          icon="storefront"
          label="Depósito"
          options={['Todos los Depósitos', 'Depósito 1', 'Depósito 2']}
          value={selectedWarehouse}
          onChange={handleWarehouseChange}
        />

        <Typography variant="subtitle" style={[styles.centeredText, { marginTop: 24 }]}>
          Comparación de Ventas y Disminución de Stock
        </Typography>
        <View style={styles.chartContainer}>
          <Typography variant="mini" style={styles.yAxisLabel}>Unidades por perdida</Typography>
          <View style={styles.chartWrapper}>
            <BarChart
              data={displayedData.map(item => ({ value: item.value, label: item.label }))}
              barWidth={chartWidth}
              barBorderRadius={4}
              frontColor="#3498db"
              height={200}
              yAxisThickness={2}
              yAxisTextStyle={{ color: '#000', fontSize: 12 }}
              stepValue={2}
            />
            <Typography variant="body" style={styles.xAxisLabel}>Días</Typography>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginBottom:50
  },
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
    alignItems: 'center',
    marginVertical: 20,
  },
  xAxisLabel: {
    position: 'absolute',
    bottom: -10,
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
});

export default ReportsScreen;

