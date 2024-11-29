import React, { useState } from 'react';
import ReportComponent from '@/components/ReportChart';
import { useReportData } from '@/hooks/useReportData';
import GeneralReportChart from '@/components/GeneralReportChart';

type ChartData = {
    label: string; 
    value: number; 
    id?: string | number; 
  };
  
const GeneralReport = () => {
  const calculateData = (report: any): ChartData[] => {
    if (!report) return [];

    const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

    return report
      ?.map((item: { startDate: string | number | Date; missing: any[]; id: any; }) => ({
        label: new Date(item.startDate)
          .toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          .replace(',', ''),
        value: sum(item.missing.map((m: { stock: any[]; }) => sum(m.stock.map((s: { quantity: any; }) => s.quantity)))),
        id: item.id,
      }))
      .filter((r: { value: number; }) => r.value > 0);
  };

  return (
    <GeneralReportChart
      useReportHook={useReportData} 
      calculateData={calculateData}
      subtitle="Comparación de Ventas y Disminución de Stock"
      xAxisLabel="Turnos"
      yAxisLabel="Unidades perdidas"
    />
  );
};

export default GeneralReport;
