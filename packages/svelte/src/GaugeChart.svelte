<script>
  import { GaugeChart } from "@rocketsoftware/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={GaugeChart}
  on:load
  on:update
  on:destroy />
