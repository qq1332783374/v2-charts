<script>
/**
 * 图表类型组件
 * 文档：https://echarts.apache.org/zh/option.html#series
 */
import { randomId, isHasChartsComponent } from "../../utils/utils";

export default {
  name: "charts-series",
  render(createElement) {
    return createElement("div");
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * 文档 https://echarts.apache.org/zh/option.html#series
     * 常见类型：
     *  line
     *  bar
     *  pie
     *  radar
     */
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentSeries: randomId(),
    };
  },
  watch: {
    data: {
      async handler() {
        this.createSeriesMapItem();
        await this.$nextTick();
        this.$parent.init();
      },
    },
  },
  created() {
    // 判断 charts 组件是否存在
    if (isHasChartsComponent.call(this)) {
      return;
    }
    this.createSeriesMapItem();
  },
  methods: {
    /**
     * 创建图表数据集合 目的是为了确保
     * 在使用多个 series 组件时 配置会重复添加到父节点
     */
    createSeriesMapItem() {
      this.$parent.seriesMap[this.currentSeries] = {
        ...this.$props,
        ...this.$attrs,
      };
    },
  },
};
</script>
