import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import Typography from '@/components/Typography';
import IconSelect from '@/components/IconSelect'; 

const ReportsScreen = () => {
  const [selectedDateRange, setSelectedDateRange] = React.useState('');
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('');

  const handleDateRangeChange = (range: React.SetStateAction<string>) => setSelectedDateRange(range);
  const handleWarehouseChange = (warehouse: React.SetStateAction<string>) => setSelectedWarehouse(warehouse);

  const barData = [
    { label: 'Día 1', sales: 300, stockChange: 270 },
    { label: 'Día 2', sales: 250, stockChange: 200 },
    { label: 'Día 3', sales: 280, stockChange: 290 },
    { label: 'Día 4', sales: 400, stockChange: 370 },
  ];

  const lineData = [
    { label: 'Semana 1', value: 30 },
    { label: 'Semana 2', value: 50 },
    { label: 'Semana 3', value: 20 },
    { label: 'Semana 4', value: 40 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Typography variant="h5" color="primary" style={[styles.centeredText, { marginTop: 40 }]}>
          Reportes de Ventas y Stock
        </Typography>
        <IconSelect
          icon="calendar-today"
          label="Rango de Fechas"
          options={['Últimas 2 Fechas', 'Último Mes']}
          value={selectedDateRange}
          onChange={handleDateRangeChange}
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
        <View style={styles.chartWrapper}>
          <BarChart
            data={barData.map(item => ({ value: item.sales - item.stockChange, label: item.label }))}
            barWidth={20}
            barBorderRadius={4}
            frontColor="#3498db"
            height={200}
          />
        </View>
        <Typography variant="subtitle" style={[styles.centeredText, { marginTop: 24 }]}>
          Tendencia de Pérdidas (Último Mes)
        </Typography>
        <View style={styles.chartWrapper}>
          <LineChart
            data={lineData}
            height={200}
            thickness={2}
          />
        </View>
        <Typography variant="body" style={{ fontWeight: 'bold', marginTop: 24 }}>
          Resumen de Discrepancias Destacadas
        </Typography>
        <Typography variant="body">
          Productos con mayores discrepancias:
        </Typography>
        <Typography variant="body">- Producto A: 15 unidades</Typography>
        <Typography variant="body">- Producto D: 20 unidades</Typography>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:100
  },
  centeredText: {
    textAlign: 'center', 
  },
  chartWrapper: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 24, 
  },
});

export default ReportsScreen;


