import { useRef, type CSSProperties } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { cn } from '@/lib/utils'

export interface ChartProps {
  options: Highcharts.Options
  className?: string
  style?: CSSProperties
}

const defaultOptions: Highcharts.Options = {
  chart: {
    style: {
      fontFamily: 'inherit',
    },
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  title: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  legend: {
    itemStyle: {
      fontSize: '12px',
    },
  },
}

export function Chart({ options, className, style }: ChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null)

  const mergedOptions: Highcharts.Options = {
    ...defaultOptions,
    ...options,
    chart: {
      ...defaultOptions.chart,
      ...options.chart,
    },
  }

  return (
    <div className={cn('w-full', className)} style={style}>
      <HighchartsReact
        highcharts={Highcharts}
        options={mergedOptions}
        ref={chartRef}
      />
    </div>
  )
}

export interface LineChartProps {
  title?: string
  series: Highcharts.SeriesOptionsType[]
  categories?: string[]
  yAxisTitle?: string
  className?: string
  style?: CSSProperties
}

export function LineChart({
  title,
  series,
  categories,
  yAxisTitle,
  className,
  style,
}: LineChartProps) {
  const options: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    series,
  }

  return <Chart options={options} className={className} style={style} />
}

export interface PieChartProps {
  title?: string
  data: Array<{ name: string; y: number; color?: string }>
  className?: string
  style?: CSSProperties
}

export function PieChart({ title, data, className, style }: PieChartProps) {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: title,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: title || 'Data',
        data,
      },
    ],
  }

  return <Chart options={options} className={className} style={style} />
}

export interface BarChartProps {
  title?: string
  series: Highcharts.SeriesOptionsType[]
  categories?: string[]
  yAxisTitle?: string
  horizontal?: boolean
  className?: string
  style?: CSSProperties
}

export function BarChart({
  title,
  series,
  categories,
  yAxisTitle,
  horizontal = false,
  className,
  style,
}: BarChartProps) {
  const options: Highcharts.Options = {
    chart: {
      type: horizontal ? 'bar' : 'column',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    series,
  }

  return <Chart options={options} className={className} style={style} />
}

export { Highcharts }
