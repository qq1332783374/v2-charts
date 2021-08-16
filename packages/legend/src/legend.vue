<script>
import { isHasChartsComponent } from "../../utils/utils";
/**
 * 图例组件
 * 文档：https://echarts.apache.org/zh/option.html#legend
 */
export default {
  name: "charts-legend",
  render(createElement) {
    return createElement("div");
  },
  created() {
    // 判断 charts 组件是否存在
    if (isHasChartsComponent.call(this)) {
      return;
    }
    this.$parent.setOptions("legend", { ...this.$props, ...this.$attrs });
  },
};
</script>
    