<template>
    <div>
      <v-chart :option="chartOptions" style="width: 500px; height: 400px;"></v-chart>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  
  // Manually register required components
  use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);
  
  export default defineComponent({
    name: 'DoughnutChart',
    components: {
      VChart,
    },
    data() {
      return {
        chartOptions: {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Total Encaisée TTC' },
                { value: 735, name: 'Total Facturé TTC' },
                { value: 580, name: "Du a plus d'un mois" },
              ]
            }
          ]
        }
      };
    }
  });
  </script>
  
  <style scoped>
  div {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  