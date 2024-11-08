<template>
  <div>Protected page</div>
  <n-button @click="handleLogout">Logout</n-button>
  <n-divider />
  <n-spin v-if="exchangeRateLoading" size="large" />
  <div v-if="!exchangeRateLoading">
    <n-input-group>
      <n-input-number
        v-model:value="sourceInput"
        :show-button="false"
        :style="{ width: '70%' }"
        @update:value="handleSourceInputChange"
      />
      <n-select
        :style="{ width: '30%' }"
        filterable
        v-model:value="sourceCurrency"
        :options="supportCurrencies"
        @update:value="handleCurrencyOnChange"
      />
    </n-input-group>
    <n-divider />
    <n-input-group>
      <n-input-number
        v-model:value="destinationInput"
        :show-button="false"
        :style="{ width: '70%' }"
        @update:value="handleDestinationInputChange"
      />
      <n-select
        :style="{ width: '30%' }"
        v-model:value="destinationCurrency"
        filterable
        :options="supportCurrencies"
        @update:value="handleCurrencyOnChange"
      />
    </n-input-group>
  </div>

  <n-divider />
  <n-button
    type="primary"
    @click="handleHistoricalClick"
    :disabled="sourceCurrency == destinationCurrency"
    >Show 14 days historical data</n-button
  >
  <n-divider />

  <n-spin v-if="historicalDataLoading" size="large" />
  <HistoricalDataComponent
    v-if="!historicalDataLoading && showHistoricalData"
    :historicalData="historicalData"
    :sourceCurrency="sourceCurrency"
    :destinationCurrency="destinationCurrency"
  />
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import moment from 'moment'
import { useMessage } from 'naive-ui'

import mockData from '../mock/data'
import { useAuth } from '../stores/auth'
import HistoricalDataComponent from '../components/HistoricalDataComponent.vue'
import config from '../../config'

export default defineComponent({
  setup() {
    // Initialize useMessage() inside the setup() function
    const message = useMessage()

    // Return the message instance so it can be used in methods
    return { message }
  },
  components: {
    HistoricalDataComponent,
  },
  data() {
    return {
      exchangeRateLoading: false,
      historicalDataLoading: false,
      supportCurrencies: [],
      sourceCurrency: 'USD',
      destinationCurrency: 'MYR',
      sourceInput: 1,
      destinationInput: 0,
      exchangeRate: 0,
      showHistoricalData: false,
      historicalData: {},
    }
  },
  mounted() {
    // fetch exchange rate
    this.fetchExchangeRate(this.sourceCurrency, this.destinationCurrency)
  },
  beforeRouteEnter(to, from, next) {
    // DELETE THIS
    next((vm) => {
      const currencyOptions = []
      for (const key in mockData.mockSupportedCurrency.currencies) {
        currencyOptions.push({
          label: key,
          value: key,
        })
      }
      vm.supportCurrencies = currencyOptions
    })
    return
    ///////////////////
    axios
      .get(`https://api.exchangerate.host/list?access_key=${config.API_ACCESS_KEY}`)
      .then((res) => {
        next((vm) => {
          const currencyOptions = []
          for (const key in res.data.currencies) {
            currencyOptions.push({
              label: key,
              value: key,
            })
          }
          vm.supportCurrencies = currencyOptions
        })
      })
      .catch((error) => {
        alert('Something went wrong, please try again later')
        next()
      })
  },
  watch: {
    exchangeRate(newVal) {
      if (this.sourceCurrency == this.destinationCurrency) {
        this.destinationInput = this.sourceInput
      } else {
        this.destinationInput = Math.round(this.sourceInput * newVal * 100) / 100
      }
    },
  },
  methods: {
    handleHistoricalClick() {
      // DELETE THIS
      // this.historicalData = mockData.mockTimeFrame.quotes
      //////////////////////////////////////////

      this.showHistoricalData = true
      const cacheTimeFrameData = this.getItemWithExpiration(
        `timeFrameData${`${this.sourceCurrency}${this.destinationCurrency}`}`,
      )
      if (cacheTimeFrameData) {
        this.historicalData = cacheTimeFrameData
      } else {
        this.historicalDataLoading = true
        const today = moment().format('YYYY-MM-DD')
        const thirdteenDaysAgo = moment().subtract(13, 'days').format('YYYY-MM-DD')
        axios
          .get(
            `https://api.exchangerate.host/timeframe?access_key=${config.API_ACCESS_KEY}&source=${this.sourceCurrency}&currencies=${this.destinationCurrency}&start_date=${thirdteenDaysAgo}&end_date=${today}`,
          )
          .then((res) => {
            this.historicalData = res.data.quotes
            this.setItemWithExpiration(
              `timeFrameData${`${this.sourceCurrency}${this.destinationCurrency}`}`,
              res.data.quotes,
              5,
            )
          })
          .catch((error) => {
            this.message.error('Something went wrong, please try again later')
          })
          .finally(() => {
            this.historicalDataLoading = false
          })
      }
    },
    handleSourceInputChange() {
      if (this.sourceCurrency == this.destinationCurrency) {
        this.destinationInput = this.sourceInput
      } else {
        this.destinationInput = Math.round(this.sourceInput * this.exchangeRate * 100) / 100
      }
    },
    handleDestinationInputChange() {
      if (this.sourceCurrency == this.destinationCurrency) {
        this.sourceInput = this.destinationInput
      } else {
        this.sourceInput = Math.round((this.destinationInput / this.exchangeRate) * 100) / 100
      }
    },
    handleCurrencyOnChange() {
      this.showHistoricalData = false
      this.fetchExchangeRate(this.sourceCurrency, this.destinationCurrency)
    },
    handleLogout() {
      const { logout } = useAuth()
      logout()
      this.$router.push('/')
    },
    fetchExchangeRate(source, destination) {
      // DELETE THIS
      // this.exchangeRate = 4.4035
      // return
      /////////////////////////////////
      const cacheExchangeRate = this.getItemWithExpiration(
        `exchangeRateData${`${this.sourceCurrency}${this.destinationCurrency}`}`,
      )
      if (cacheExchangeRate) {
        this.exchangeRate = cacheExchangeRate
      } else {
        this.exchangeRateLoading = true
        axios
          .get(
            `https://api.exchangerate.host/live?access_key=${config.API_ACCESS_KEY}&source=${source}&currencies=${destination}`,
          )
          .then((res) => {
            this.exchangeRate = res.data.quotes[`${this.sourceCurrency}${this.destinationCurrency}`]
            this.setItemWithExpiration(
              `exchangeRateData${`${this.sourceCurrency}${this.destinationCurrency}`}`,
              res.data.quotes[`${this.sourceCurrency}${this.destinationCurrency}`],
              60,
            )
          })
          .catch((error) => {
            this.message.error('Something went wrong, please try again later')
          })
          .finally(() => {
            this.exchangeRateLoading = false
          })
      }
    },
    setItemWithExpiration(key, value, expiresInMinutes) {
      const expires = new Date().getTime() + expiresInMinutes * 60 * 1000
      const data = { value, expires }
      localStorage.setItem(key, JSON.stringify(data))
    },
    getItemWithExpiration(key) {
      const storedData = JSON.parse(localStorage.getItem(key))
      const now = new Date().getTime()

      if (storedData && storedData.expires <= now) {
        localStorage.removeItem(key)
        return null
      } else {
        return storedData ? storedData.value : null
      }
    },
  },
})
</script>
