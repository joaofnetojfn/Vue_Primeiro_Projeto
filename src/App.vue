<template>
  <div id="todo">
    <div id="app" class="d-flex align-items-center justify-content-center ">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="d-flex align-items-center justify-content-center flex-fill">
            <b-form-input
              id="input-1"
              v-model="form.primeiroNome"
              type="text"
              required
              placeholder="Primeiro Nome"
              class="estiloInp"
            ></b-form-input>

            <b-form-input
              id="input-2"
              v-model="form.segundoNome"
              required
              placeholder="segundo Nome"
              class="estiloInp"
            ></b-form-input>

            <input  id="parte" name="porcetagem"
            placeholder="Porcentagem"  type="number"
            :min="1" :max="100"
            required
            v-model.number="form.porcento" class="estiloInp" >

          <b-button type="submit" variant="outline-primary alinhaBtn ">Send</b-button>
          <!--<b-button type="reset" variant="danger alinhaBtn">Reset</b-button>-->
        </b-form>
      </div>
      <div id="conteudo" v-if="tabelaPopula.length > 0" >
        <h3 class="d-flex justify-content-center  align-items-center alinhaH3">{{msg}}</h3>
        <p class="d-flex align-items-center justify-content-center ">{{texto}}</p>

        <ListaTabela
        v-bind:cabecalhoTitulo="msg"
        v-bind:popular="tabelaPopula"
        v-bind:titulos="['Primeiro Nome','Segundo Nome', 'Porcentagem']"></ListaTabela>

        <div id="grafico">
          <PieChart
            :chartData="this.datacollection"
            ></PieChart>
        </div>
      </div>
  </div>

</template>

<script>
import ListaTabela from './componentes/ListaTabela.vue';
import PieChart from './componentes/PieChart.vue';

export default {
  name: 'app',
  props:['ListaTabela','PieChart'],
  components:{
    ListaTabela,
    PieChart
  },
  data () {
    return {
      msg: 'DATA',
      texto:'Tabela e grafico dos dados inserito no formulario',
       form: {
          primeiroNome: '',
          segundoNome:'',
          porcento: null,
          id:0
        },
        show: true,
        tabelaPopula: [],
        datacollection: null,
        color:[]
    }
  },
  mounted() {
    //this.fillData()
    //console.log( this.datacollection)
    // console.log( this.tabelaPopula)

  },
  methods: {
      onSubmit(evt) {
        evt.preventDefault()
        //console.log(this.tabelaPopula);
        this.form.id ++;
        this.tabelaPopula.push({...this.form});
        this.fillData(
          {
            labelsMy:[`${this.form.primeiroNome} ${this.form.segundoNome}`],
            dataMy:[this.form.porcento]
            })
        // this.labelsMy.push( this.form.primeiroNome + ' ' + this.form.segundoNome);
        // this.dataMy.data.push(...this.form.porcento);
        // this.dataMy.backgroundColor.push(Math.floor(Math.random()*16777215).toString(16));


      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.segundoNome = ''
        this.form.name = ''
        this.form.porcento = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      fillData ({labelsMy,dataMy}) {
        this.color.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        this.datacollection = {
          labels: (this.tabelaPopula.length > 1) ? [...this.datacollection.labels, labelsMy] : [labelsMy],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: (this.tabelaPopula.length > 1) ?  [...this.color, this.color]: [ this.color],
              data:  (this.tabelaPopula.length > 1) ? [...this.datacollection.datasets[0].data, dataMy] : [dataMy]
            }
          ]
        }
      }
  },
  watch: {
    form:{
      handler:function(val){
        if(val.porcento > 100){
          this.form.porcento = 100;
        }else if(val.porcento === ''){
          this.form.porcento = 0;
        }
      },
      deep:true
    }
  }

}
</script>

<style lang="scss">
#grafico{
    display: block;
    width: 500px;
    height: 500px;
    float: left;
    margin-left: 105px;
    margin-top: 10px;

}
.alinhaBtn{
    float: left;
    color:white;
    border-color: white;
    width: 100px;
}
.estiloInp{
  height: 35px;
  width: 25%;
  text-align: center;
  margin: 20px 10px 20px 0px;
}
.alinhaH3{
  margin-top: 20px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #01B8E2;
}
.btn-outline-primary:focus, .btn-outline-primary.focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255,0.31);
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
