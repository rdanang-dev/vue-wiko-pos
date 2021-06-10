<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  computed: {
    renderData: function() {
      return this.chartdata;
    },
  },
  mounted() {
    this.renderLineChart();
  },
  methods: {
    renderLineChart() {
      this.renderChart(this.renderData, this.options);
    },
  },
  watch: {
    chartdata: {
      handler: function() {
        this.renderLineChart();
      },
      deep: true,
    },
  },
};
</script>
