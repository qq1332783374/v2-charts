<script>
import { isHasChartsComponent } from "../../utils/utils";
export default {
  name: "charts-xAxis",
  render(createElement) {
    return createElement("div");
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * 直角坐标系 grid 中的 x 轴
     * 文档：https://echarts.apache.org/zh/option.html#xAxis
     */
    type: {
      type: String,
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
    this.$parent.setOptions("xAxis", { ...this.$props, ...this.$attrs });
  },
};
</script>
