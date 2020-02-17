<script>
// MonthlyIncome.js
import { Doughnut, mixins } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
   //props: { chartData: { type: Array, required: true }, chartLabels: { type: Array, required: true } }
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>



