<template>
  <div>
    <el-table :data="render.records" show-summary	:summary-method="method.calcAverage">
      <el-table-column v-for="item in render.CONFIG" :key="item.key" :prop="item.key" :label="item.name" />
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { CONFIG } from './config'
import records from '../../records.json'
export default defineComponent({
  setup() {
    /**
     * 计算列平均
     */
    function calcAverage({ columns, data }) {
      const sums = {}
      data.forEach(item => {
        columns.forEach((col, index) => {
          const config = CONFIG[index]
          const { key, ave } = config
          if (!ave) return
          if (!sums[key]) sums[key] = 0
          sums[key] += item[key]
        })
      })
      return columns.map((item, index) => {
        const config = CONFIG[index]
        const { key, ave } = config
        if (index === 0) return '平均'
        if (!ave) return ''
        return (sums[key] / data.length).toFixed(2)
      })
    }
    return {
      render: {
        records,
        CONFIG
      },
      method: {
        calcAverage
      }
    }
  }
})
</script>
