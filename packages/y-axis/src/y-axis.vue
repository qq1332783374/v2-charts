<script>
import { isHasChartsComponent } from "../../utils/utils";

export default {
  name: "charts-yAxis",
  render(createElement) {
    return createElement("div");
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * 直角坐标系 grid 中的 y 轴
     * 文档：https://echarts.apache.org/zh/option.html#yAxis
     */
    type: {
      type: String,
      default: "value",
      validator: (val) => {
        return ["value", "category", "time", "log"].indexOf(val) !== -1;
      },
    },
  },
  created() {
    // 判断 charts 组件是否存在
    if (isHasChartsComponent.call(this)) {
      return;
    }
    this.$parent.setOptions("yAxis", { ...this.$props, ...this.$attrs });
  },
};
</script>
