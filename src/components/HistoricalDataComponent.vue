<template>
  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>Date</th>
        <th>Exchange Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(historical, key) in historicalData" :key="key">
        <td>{{ key }}</td>
        <td>{{ historical[`${sourceCurrency}${destinationCurrency}`] }}</td>
      </tr>
    </tbody>
  </n-table>
  <n-divider />
  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>Title</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Highest</td>
        <td>{{ highest }}</td>
      </tr>
      <tr>
        <td>Lowest</td>
        <td>{{ lowest }}</td>
      </tr>
    </tbody>
  </n-table>
  <n-divider />
  <ChartComponent
    :historicalData="historicalData"
    :sourceCurrency="sourceCurrency"
    :destinationCurrency="destinationCurrency"
  />
</template>
<script>
import { defineComponent } from 'vue'

import ChartComponent from './ChartComponent.vue'
export default defineComponent({
  props: ['historicalData', 'sourceCurrency', 'destinationCurrency'],
  components: {
    ChartComponent,
  },
  computed: {
    highest() {
      const values = Object.values(this.historicalData).map(
        (entry) => entry[`${this.sourceCurrency}${this.destinationCurrency}`],
      )
      return Math.max(...values)
    },
    lowest() {
      const values = Object.values(this.historicalData).map(
        (entry) => entry[`${this.sourceCurrency}${this.destinationCurrency}`],
      )
      return Math.min(...values)
    },
  },
})
</script>
