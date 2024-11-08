<template>
  <LineChart :chartData="chartData" />
</template>

<script>
import { defineComponent } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  components: { LineChart },
  props: ['historicalData', 'sourceCurrency', 'destinationCurrency'],
  computed: {
    chartData() {
      const chartData = {
        labels: [],
        datasets: [
          {
            label: '14 days historical data',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      }
      for (const key in this.historicalData) {
        chartData.labels.push(key)
        chartData.datasets[0].data.push(
          this.historicalData[key][`${this.sourceCurrency}${this.destinationCurrency}`],
        )
      }

      return chartData
    },
  },
})
</script>
