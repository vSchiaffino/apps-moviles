import React, { useState } from 'react';
import ReportComponent from '@/components/ReportChart';
import { useReportData } from '@/hooks/useReportData';
import useOneShiftData from '@/hooks/useOneShiftData';

interface Warehouse {
  id: string;
  name: string;
}

const WarehouseReport: React.FC = () => {
  const useReportHook = useReportData;

  const calculateData = (report: any) => {
    const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0);

    const warehouses: Warehouse[] = report
      ? (Array.from(
          new Map(
            report
              .flatMap((r: any) =>
                r.missing.map((m: any) => ({
                  name: m.warehouse.name,
                  id: m.warehouse.id,
                }))
              )
              .map((warehouse: Warehouse) => [warehouse.id, warehouse])
          ).values()
        ) as Warehouse[])
      : [];

    return warehouses.map(({ id, name }) => ({
      label: name,
      value: sum(
        report
          ?.flatMap((r: any) =>
            r.missing
              .filter((m: any) => m.warehouse.id === id)
              .flatMap((m: any) => sum(m.stock.map((s: any) => s.quantity)))
          )
          .filter((q: number) => q > 0) || []
      ),
      id,
    }));
  };

  return (
    <ReportComponent
      useReportHook={useReportHook}
      calculateData={calculateData}
      subtitle="Comparación de Ventas y Disminución de Stock por deposito"
      xAxisLabel="Depositos"
      yAxisLabel="Unidades perdidas"
    />
  );
};

export default WarehouseReport;

