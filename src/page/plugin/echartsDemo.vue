<template>
  <div class="m-wrap">
    <div>
      <h2>ECharts：百度开源的纯 Javascript 图表库</h2>
      详细文档：<br />
      <a target="_blank"
         href="https://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts">
        https://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts
      </a>
    </div>

    <div class="m-course">
      <div class="m-group-title">
        <strong>在 webpack 中使用 ECharts</strong>
      </div>

      <div>
        <div class="m-step-title">
          <strong>npm 安装 ECharts</strong>
        </div>
        <pre>
          npm install echarts --save
        </pre>
      </div>

      <div>
        <div class="m-step-title">
          <strong>定义 echarts id 标签</strong>
        </div>
        <pre>
          &lt;div id="myChartId" style="width: 500px; height: 300px;"&gt; &lt;/div&gt;
        </pre>
      </div>

      <div>
        <div class="m-step-title">
          <strong>初始化 ECharts 并设置数数</strong>
        </div>
        <pre>
          let echarts = require('echarts')

          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('main'))
          // 绘制图表
          myChart.setOption({
              title: {
                  text: 'ECharts 入门示例'
              },
              tooltip: {},
              xAxis: {
                  data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20]
              }]
          })
        </pre>
      </div>
    </div>

    <div class="m-example">
      <div id="myChartId"
         style="width: 500px; height: 300px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'echartsDemo',
  props: {},
  components: {},
  data () {
    return {
      title: 'vue template'
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    this.initECharts()
  },
  methods: {
    initECharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChartId'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style scoped rel="stylesheet">
</style>
