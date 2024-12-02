import { LayoutChangeEvent, View } from 'react-native'
import React from 'react'
import Card from '../Card'
import Typography from '../Typography'
import { LineChart } from 'react-native-gifted-charts'
import { Colors } from '@/constants/Colors'
import { Spacing } from '@/constants/Spacing'

export interface CardLineChartProps {
  data: { value: number }[]
  title?: string
  colorPallete?: string
  errorMessage?: string
}

const CardLineChart: React.FC<CardLineChartProps> = ({
  data,
  title = 'Chart',
  colorPallete = Colors.primary,
  errorMessage = '',
}) => {
  const [width, setWidth] = React.useState(350)
  // const onCardRendered = (e: LayoutChangeEvent) => {
  //   if (!e || !e.target) return
  //   e.target.measure((x, y, width, height, px, py) => {
  //     setWidth(width - px + 12)
  //   })
  // }
  return (
    <Card
      style={{
        width: '100%',
        height: 'auto',
        backgroundColor: colorPallete[200],
        borderRadius: 16,
        margin: 0,
      }}
    >
      {data.length >= 2 ? (
        <View style={{ padding: 10 }}>
          <Typography color="primary" variant="h5">
            {data.reduce((acc, curr) => acc + curr.value, 0)} {title}
          </Typography>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Typography color="primary" variant="bold">
              {(
                ((data[data.length - 1]?.value - data[data.length - 2]?.value) /
                  (data.reduce((acc, curr) => acc + curr.value, 0) / data.length)) *
                100
              ).toFixed(2)}
              %
            </Typography>
            <Typography color="primary" variant="body">
              que ayer
            </Typography>
          </View>
        </View>
      ) : (
        <View style={{ padding: 20, gap: Spacing.rowGap }}>
          <Typography color="primary" variant="h5">
            {title}
          </Typography>
          <Typography variant="mini" color="primary" justify="center">
            {errorMessage}
          </Typography>
        </View>
      )}
      {data.length >= 2 ? (
        <LineChart
          areaChart
          isAnimated
          curved
          xAxisColor={colorPallete[600]}
          yAxisColor={colorPallete[600]}
          xAxisLabelTextStyle={{ color: colorPallete[600] }}
          yAxisLabelWidth={0}
          data={data}
          height={200}
          width={width - 16}
          initialSpacing={0}
          color1={colorPallete[600]}
          hideDataPoints
          adjustToWidth
          startFillColor1={colorPallete[500]}
          endFillColor1={colorPallete[200]}
          startOpacity={0.9}
          endOpacity={1}
        />
      ) : (
        <></>
      )}
    </Card>
  )
}

export default CardLineChart
