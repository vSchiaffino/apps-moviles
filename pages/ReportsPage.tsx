import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import Modal from 'react-native-modal';
import Typography from '@/components/Typography';
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
}

interface APIResponse {
  sales: { date: string; products: Sale[] }[];
  stockLevels: {date:string;products:ProductStock[]}[];
}

const ReportsScreen = () => {
  const [selectedInitialDate, setSelectedInitialDate] = useState('');
  const [selectedFinalDate, setSelectedFinalDate] = useState('');
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

  const mockData: APIResponse = 
    {
      sales: [
        { date: '2024-11-01', products: [{ productId: 'A', quantity: 10 }, { productId: 'B', quantity: 5 }] },
        { date: '2024-11-07', products: [{ productId: 'A', quantity: 5 }, { productId: 'B', quantity: 8 }] },
        { date: '2024-11-14', products: [{ productId: 'C', quantity: 2 }, { productId: 'B', quantity: 2 }] }
      ],
      stockLevels: [
        { 
          date: '2024-11-01', 
          products: [
            { productId: 'A', initial: 100, final: 80 },
            { productId: 'B', initial: 20, final: 8 }
          ]
        },
        { 
          date: '2024-11-07', 
          products: [
            { productId: 'A', initial: 100, final: 80 },
            { productId: 'B', initial: 20, final: 8 },
          ]
        }
      ]
  };

  const fetchData = async () => {
    setData(mockData);
  };

  useEffect(() => {
    fetchData();
    console.log([selectedInitialDate, selectedFinalDate])
  }, [selectedInitialDate, selectedFinalDate]);

  const processDataForCharts = () => {
    if (!data) return { barData: [], lineData: [] };
  
    let barData: any[] = [];
    let lineData: any[] = [];
  
    // Pérdidas por fecha
    data.sales.forEach((sale) => {
      // Filtrar los registros de stock para la fecha de la venta
      const stockOnSaleDate = data.stockLevels.filter((stock) => stock.date === sale.date);
  
      // Si no hay registros de stock para esa fecha, no se procesan las pérdidas
      if (stockOnSaleDate.length === 0) {
        return; // No hay stock para esta fecha, por lo que no se cuentan pérdidas
      }
  
      let totalSales = sale.products.reduce((sum, product) => sum + product.quantity, 0);
      let totalLosses = 0;
  
      // Comparar ventas con stock para cada producto en la fecha de venta
      stockOnSaleDate.forEach((stock) => {
        stock.products.forEach(product => {
          const stockChange = product.initial - product.final;
          const actualSales = sale.products.find(p => p.productId === product.productId)?.quantity || 0;
          const validLoss = stockChange >= actualSales ? stockChange - actualSales : 0;
          totalLosses += validLoss;
        });
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
        
        <Modal
          isVisible={finalModalVisible}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
          useNativeDriverForBackdrop={true}
          backdropOpacity={0.7}
          hasBackdrop={true}
          onBackdropPress={() => setFinalModalVisible(false)}
          onBackButtonPress={() => setFinalModalVisible(false)}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={styles.modalContent}>
            <Calendar
              style={{ backgroundColor: 'transparent' }}
              onDayPress={handleFinalDayPress}
              markedDates={{ [selectedFinalDate]: { selected: true, selectedColor: 'blue' } }}
              monthFormat={'yyyy MMMM'}
            />
            <Pressable onPress={() => setFinalModalVisible(false)} style={styles.closeButton}>
              <Typography variant="h6" style={{ color: 'white' }}>Cerrar</Typography>
            </Pressable>
          </View>
        </Modal>

        <Typography variant="subtitle" style={[styles.centeredText, { marginTop: 24 }]}>
          Comparación de Ventas y Disminución de Stock
        </Typography>
        <View style={styles.chartContainer}>
          <Typography variant="mini" style={styles.yAxisLabel}>Unidades por perdida</Typography>
          <ScrollView style={styles.chartWrapper} horizontal={true}>
            <BarChart
              data={displayedData.map(item => ({ value: item.value, label: item.label }))}
              barWidth={chartWidth}
              barBorderRadius={4}
              frontColor="#3498db"
              height={200}
              yAxisThickness={2}
              yAxisTextStyle={{ color: '#000', fontSize: 12 }}
              stepValue={3}
            />
            <Typography variant="body" style={styles.xAxisLabel}>Días</Typography>
          </ScrollView>
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
});

export default ReportsScreen;