<template>
  <div id="app">
    aa
    <!-- <charts :loading="false" width="100%" :empty="false">
      <chart-title text="这是个图表标题" />
      <Legend />
      <tooltip />
      <x-axis
        :data="['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']"
        type="category"
      />
      <y-axis type="value" />
      <series
        type="bar"
        name="销量"
        :data="chartsData"
        :label="{
          formatter: function (item) {
            return '{c}|{b}';
          },
        }"
      />
      <series type="bar" name="销量1" :data="chartsData1" />
    </charts>
    <charts :loading="loading" width="100%" :autoSelect="true"> -->
    <!-- <Legend left="center" /> -->
    <!-- <tooltip trigger="item" />
      <series 
        type="pie" 
        name="访问来源" 
        :data="pieData" 
        :label="{
          formatter (item) {
            return `${item.name}\n ${item.value}`
          }
        }"
      />
    </charts> -->
    <charts width="100%" height="500px">
      <charts-legend left="center"/>
      <charts-tooltip trigger="item" />
      <charts-series 
        type="pie" 
        name="访问来源" 
        :data="pieData" 
        :label="{
          formatter (item) {
            return `${item.name}\n ${item.value}`
          }
        }"
      />
    </charts>
    <charts :loading="loading" width="100%" height="500px" :autoSelect="true">
      <charts-legend left="center"/>
      <charts-tooltip trigger="item" />
      <charts-series 
        type="pie" 
        name="访问来源" 
        :data="pieData" 
        :label="{
          formatter (item) {
            return `${item.name}\n ${item.value}`
          }
        }"
      />
    </charts>
    <charts :loading="loading" width="100%" height="500px" :autoSelect="true">
      <charts-legend left="center"/>
      <charts-tooltip trigger="item" />
      <charts-series 
        type="pie" 
        name="访问来源" 
        :data="pieData" 
        :label="{
          formatter (item) {
            return `${item.name}\n ${item.value}`
          }
        }"
      />
    </charts>
  </div>
</template>

<script>
// import Charts from "./components/charts/index.vue";
// import ChartTitle from './components/charts/components/chart-title.vue'
// import Tooltip from "./components/charts/components/tooltip.vue";
// import Legend from "./components/charts/components/legend.vue";
// import XAxis from "./components/charts/components/x-axis.vue";
// import YAxis from "./components/charts/components/y-axis.vue";
// import Series from "./components/charts/components/series.vue";

export default {
  name: "App",
  components: {
    // Charts,
    // ChartTitle,
    // Tooltip,
    // Legend,
    // XAxis,
    // YAxis,
    // Series,
  },
  data() {
    return {
      aMap: null,
      loading: true,
      chartsData: [5, 20, 36, 10, 10, 20],
      chartsData1: [5, 20, 36, 10, 10, 20],
      pieData: [
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 484, name: "联盟广告" },
        { value: 300, name: "视频广告" },
      ],
    };
  },
  async mounted() {
    setInterval(() => {
      this.loading = false;
      const data = [];
      const data1 = [];
      for (let i = 0; i < 10; i++) {
        data.push(this.createRandom());
        data1.push(this.createRandom());
      }
      this.chartsData = data;
      this.chartsData1 = data1;
    }, 2000);
  },
  methods: {
    createRandom() {
      return Math.ceil(Math.random() * 10000);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
