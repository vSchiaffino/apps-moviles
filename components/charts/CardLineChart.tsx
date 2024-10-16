import { LayoutChangeEvent, View } from 'react-native'
import React from 'react'
import Card from '../Card'
import Typography from '../Typography'
import { LineChart } from 'react-native-gifted-charts'
import { Colors } from '@/constants/Colors'

export interface CardLineChartProps {
  data: { value: number }[]
}

const CardLineChart: React.FC<CardLineChartProps> = ({ data }) => {
  const [width, setWidth] = React.useState(350)
  const onCardRendered = (e: LayoutChangeEvent) => {
    console.log('Card rendered')
    e.target.measure((x, y, width, height, px, py) => {
      setWidth(width - px)
    })
  }
  return (
    <Card
      style={{
        width: '100%',
        height: 'auto',
        backgroundColor: Colors.primary[200],
        borderRadius: 16,
        margin: 0,
      }}
      onLayout={onCardRendered}
    >
      <View style={{ padding: 20 }}>
        <Typography color="primary" variant="body">
          Ingresos
        </Typography>
        <Typography color="primary" variant="bolder">
          $19.76M
        </Typography>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Typography color="primary" variant="bold">
            +38.98%
          </Typography>
          <Typography color="primary" variant="body">
            que los anteriores 30 días
          </Typography>
        </View>
      </View>
      <LineChart
        areaChart
        hideAxesAndRules
        curved
        yAxisLabelWidth={0}
        data={data}
        height={200}
        width={width - 16}
        initialSpacing={0}
        color1={Colors.primary[600]}
        hideDataPoints
        adjustToWidth
        startFillColor1={Colors.primary[500]}
        endFillColor1={Colors.primary[200]}
        startOpacity={0.9}
        endOpacity={1}
      />
    </Card>
  )
}

export default CardLineChart
