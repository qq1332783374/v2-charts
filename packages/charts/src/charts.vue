<template>
  <div class="dv-charts" :style="styles" style="position: relative">
    <div
      v-if="!loading || !empty"
      :id="domId"
      class="charts"
      style="width: 100%; height: 100%"
    >
      <slot />
    </div>
    <loading v-show="loading" :title="loadingText" />
    <empty v-show="!loading && empty" :title="emptyText" />
  </div>
</template>

<script>
import { echartScriptLoad, loopShowTooltip, randomId } from "../../utils/utils";
import Loading from "../../loading/src/loading.vue";
import Empty from "../../empty/src/empty.vue";

export default {
  name: "charts",
  components: {
    Loading,
    Empty,
  },
  props: {
    width: {
      type: String,
      default: () => "300px",
    },
    height: {
      type: String,
      default: () => "300px",
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    loadingText: {
      type: String,
      default: () => "加载中...",
    },
    empty: {
      type: Boolean,
      default: () => false,
    },
    emptyText: {
      type: String,
      default: () => "暂无数据",
    },
    // 图表自动选中
    autoSelect: {
      type: Boolean,
      default: () => false,
    },
    // 自动选中配置
    autoSelectOptions: {
      type: Object,
      default: () => {
        return {
          loopSeries: true,
        };
      },
    },
    /**
     * 图表拓展属性
     * 不想用组件可以直接用这个
     */
    chartExpandAttrs: {
      type: Object,
    },
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  data() {
    return {
      echarts: null,
      // 用于子组件做判断
      componentName: "_charts",
      // 生成一个随机 ID 确保多个组件ID唯一性
      domId: randomId(),
      charts: null,
      loopShowTooltip: null,
      chartOptions: {},
      seriesMap: {},
    };
  },
  watch: {
    loading() {
      this.init();
    },
    empty() {
      this.init();
    },
  },
  beforeDestroy() {
    this.clearListener();
  },
  mounted() {
    this.echartInit();
  },
  methods: {
    async echartInit() {
      try {
        // cdn 加载 eCharts
        this.echarts = await echartScriptLoad();
        await this.init();
      } catch (err) {
        console.log("err", err);
      }
    },
    async init() {
      // 刷新节点
      await this.$nextTick();
      // 状态判断
      if (this.loading || this.empty) {
        this.clearListener();
        return false;
      }
      // 处理图表数据
      this.chartOptions["series"] = Object.keys(this.seriesMap).map(
        (seriesKeyName) => this.seriesMap[seriesKeyName]
      );
      const chartOptions = { ...this.chartOptions, ...this.chartExpandAttrs };
      // 防止重复实例化
      if (!this.charts) {
        this.charts = this.echarts.init(document.getElementById(this.domId));
      }
      // 绘制图表
      this.charts.setOption(chartOptions);
      // 监听窗口变化 动态改变图表的大小
      window.addEventListener("resize", this.charts.resize);
      // 自动选中
      if (this.autoSelect) {
        this.loopShowTooltip = loopShowTooltip(
          this.charts,
          chartOptions,
          this.autoSelectOptions
        );
      }
    },
    /**
     * 设置图表配置项
     * 主要用于给子组件调用
     * @param field 图表配置项
     * @param val 相应的值
     */
    setOptions(field, val) {
      this.chartOptions[field] = val;
    },
    /**
     * 清除相关监听事件
     */
    clearListener() {
      // 清除图表 释放性能
      if (this.charts) {
        window.removeEventListener("resize", this.charts.resize);
        this.charts.clear();
        this.charts = null;
      }
      // 清除自动选择 释放性能
      if (this.loopShowTooltip) {
        this.loopShowTooltip.clearLoop();
        this.loopShowTooltip = null;
      }
    },
  },
};
</script>
