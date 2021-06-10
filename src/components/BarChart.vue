<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
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
    this.renderBarChart();
  },
  methods: {
    renderBarChart() {
      this.renderChart(this.renderData, this.options);
    },
  },
  watch: {
    chartdata: {
      handler: function() {
        this.renderBarChart();
      },
      deep: true,
    },
  },
};
</script>
