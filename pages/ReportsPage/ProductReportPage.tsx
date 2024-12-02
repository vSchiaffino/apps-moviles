import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ReportComponent from '@/components/ReportChart';
import { useReportData } from '@/hooks/useReportData';
import useOneShiftData from '@/hooks/useOneShiftData'

const ProductReport: React.FC = () => {
  const useReportHook = useReportData;

  const calculateData = (report: any) => {
    const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

    const products = Array.from(
      new Map(
        report
          ?.flatMap((r: any) =>
            r.missing.flatMap((m: any) =>
              m.stock.map((s: any) => ({ id: s.productId, name: s.product?.name })),
            ),
          )
          .filter((product: any) => product.name !== undefined)
          .map((product: any) => [product.id, product]),
      ).values(),
    ) as { id: string; name: string }[];

    return products.map(({ id, name }) => ({
      label: name,
      value: sum(
        report
          ?.flatMap((r: any) =>
            r.missing.flatMap((m: any) =>
              m.stock.filter((s: any) => s.productId === id).map((s: any) => s.quantity),
            ),
          )
          .filter((q: number) => q > 0),
      ),
      id,
    }));
  };

  return (
    <ReportComponent
      useReportHook={useReportHook}
      calculateData={calculateData}
      subtitle="Comparación de Ventas y Disminución de Stock por Producto"
      xAxisLabel="Productos"
      yAxisLabel="Unidades perdidas"
    />
  );
};

export default ProductReport;

