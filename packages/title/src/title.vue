<script>
import { isHasChartsComponent } from "../../utils/utils";
/**
 * 标题组件，包含主标题和副标题。
 * 文档：https://echarts.apache.org/zh/option.html#title
 */
export default {
  name: "charts-title",
  render(createElement) {
    return createElement("div");
  },
  created() {
    // 判断 charts 组件是否存在
    if (isHasChartsComponent.call(this)) {
      return;
    }
    this.$parent.setOptions("title", { ...this.$props, ...this.$attrs });
  },
};
</script>
    