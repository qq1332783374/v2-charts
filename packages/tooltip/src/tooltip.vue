<script>
import { isHasChartsComponent } from "../../utils/utils";
/**
 * 图表鼠标移入提示框组件
 * 文档：https://echarts.apache.org/zh/option.html#tooltip
 */
export default {
  name: "charts-tooltip",
  render(createElement) {
    return createElement("div");
  },
  created() {
    // 判断 charts 组件是否存在
    if (isHasChartsComponent.call(this)) {
      return;
    }
    this.$parent.setOptions("tooltip", { ...this.$props, ...this.$attrs });
  },
};
</script>
