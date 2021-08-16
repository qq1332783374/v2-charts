<template>
  <div id="app">
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
    <charts :loading="loading" width="100%" height="500px">
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
    <charts :loading="loading" width="100%" height="500px">
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
export default {
  name: "App",
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
