<template>
  <canvas :id="`issuesChart_${wday}`" width="400" height="80" />
</template>

<script lang="ts" setup>
import { IssueActivityChart } from '@/models'
import Chart from 'chart.js'
import _ from 'lodash'
import { onMounted } from 'vue'

const props = defineProps<{
  analytics: IssueActivityChart
  wday: number
}>()

onMounted(() => {
  const ctx = (document.getElementById(`issuesChart_${props.wday}`) as HTMLCanvasElement).getContext('2d')
  const issues_chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: _.range(1, 25),
      datasets: [{
        label: '提交工单后的确认时间(小时)',
        data: props.analytics.issuesConfirmTime[props.wday],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: '确认工单耗时(小时)'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: '工单创建时间'
          }
        }]
      }
    }
  })
})

</script>
