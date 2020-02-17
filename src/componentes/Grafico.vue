<template>
  <div id="grafico">
    <vue-chart  type="bar" :data="chartData"></vue-chart>
  </div>
</template>



<script>
import Vue from 'vue'
import VueChart from 'vue-chart-js'

export default {
  name: 'Tabela',
  props:['popular'],
  components: {
    VueChart
  },
  data: () => ({
    nome: 'ff',
    chartData: {
        labels: this.popular,
        type: 'pie',
        datasets: [
            {
                label: 'Component 1',
                data: [10, 20, 30]
            },
            {
                label: 'Component 2',
                data: [20, 30, 40]
            }
        ]
    },
    populaGrafico: []

  }),
  mounted() {
    console.log(this.popular)
  },
  computed: {
    popularFormatted () {
      return this.popular
    }
  },
  watch: {
    name: function(){

      console.log(this.name)
    }
  },

}
</script>

<style lang="scss">


</style>
