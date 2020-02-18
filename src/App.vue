<template>
  <div id="todo">
    <ul>
      <li v-for="(erro, index) of errors" :key="index">
          campo<b>{{erro.field}}</b> - {{erro.defaultMessage}}
      </li>
    </ul>

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
            v-model.number="form.porcentagem" class="estiloInp" >

          <b-button type="submit" variant="outline-primary alinhaBtn ">Send</b-button>
          <!--<b-button type="reset" variant="danger alinhaBtn">Reset</b-button>-->
        </b-form>
      </div>
      <div id="conteudo" v-if="tabelaPopula.length > 0" >
        <h3 class="d-flex justify-content-center  align-items-center alinhaH3">{{msg}}</h3>
        <p class="d-flex align-items-center justify-content-center ">{{texto}}</p>

        <ListaTabela
        v-bind:cabecalhoTitulo="msg"
        :perPageT="perPage"
        :rowsT="rows"
        :onDelete="onDelete"
        :onEdit = "onEdit"
        :paginas = "paginas"
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
import Pessoa from './services/Pessoa.js'

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
          _id:'',
          primeiroNome: '',
          segundoNome:'',
          porcentagem: null
        },
        show: true,
        tabelaPopula: [],
        datacollection: null,
        color:[],
        errors:[],
        labels:[],
        valorGrafico:[],
        perPage: null,
        currentPage: this.currentPage !== null ? this.currentPage = 1 : this.currentPage = this.currentPage,
        rows: null
    }
  },
  mounted() {
    this.lista(this.currentPage);
  },
  methods: {
      lista(pagina){
         Pessoa.listar(pagina).then(resposta =>{
          this.tabelaPopula = resposta.data.docs;
          this.currentPage = resposta.data.page;
          this.perPage = resposta.data.limit;
          this.rows = resposta.data.total;
          this.chamaGrafico();
        });
      },
      paginas(pagina){
        this.lista(pagina)
      },
      chamaGrafico(){
        if(this.tabelaPopula.length > 0){
             this.labels =  []
             this.valorGrafico =  []
            this.tabelaPopula.forEach(element => {
              //alert(JSON.stringify(element.primeiroNome))
              this.labels.push(`${element.primeiroNome} ${element.segundoNome}`)
              this.valorGrafico.push(`${element.porcentagem}`)
              this.fillData(
              {
                labelsMy: this.labels,
                dataMy:  this.valorGrafico
              })
            });
        }
      },
      onSubmit(evt) {
        evt.preventDefault()
        if(!this.form._id){
          const data = {
            primeiroNome: this.form.primeiroNome,
            segundoNome: this.form.segundoNome,
            porcentagem: this.form.porcentagem
          }
            Pessoa.salvar(data).then(resposta =>{
              this.form = {}
              this.errors = []
              this.paginas(this.currentPage);
              alert("Pessoa Salvo com sucesso");

          })
          .catch( error => {
            this.errors = error.response.data.errors
          })
        }else{
          const data = {
            id: this.form._id,
            primeiroNome: this.form.primeiroNome,
            segundoNome: this.form.segundoNome,
            porcentagem: this.form.porcentagem
          }
          Pessoa.atualizar(data).then(resposta =>{
              this.form = {}
              this.errors = []
              alert("Pessoa ATUALIZADA com sucesso");
              this.paginas(this.currentPage);
          })
          .catch( error => {
            this.errors = error.response.data.errors
          })
        }

      },
      fillData ({labelsMy,dataMy}) {
        this.color.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        this.datacollection = {
          labels: [...labelsMy] ,
          datasets: [
            {
              label: 'Data One',
              backgroundColor:[...this.color],
              data: [...dataMy]
            }
          ]
        }
      },
      onDelete(idPessoa){
         Pessoa.deletar(idPessoa).then(resposta =>{
              alert("Pessoa Deletada com sucesso");
              this.paginas(this.currentPage-1);
          })
      },
      onEdit(pessoa){
        this.form = pessoa
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
      }
  },
  watch: {
    form:{
      handler:function(val){
        if(val.porcentagem > 100){
          this.form.porcentagem = 100;
        }else if(val.porcento === ''){
          this.form.porcentagem = 0;
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
