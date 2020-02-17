<template>
  <div id="cabecalho" class=" d-flex justify-content-center">
    <!-- <h3>{{cabecalhoTitulo}}</h3> -->
    <table style="width:100%" class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>   </th>
              <th v-for="titulo in titulos" v-bind:key="titulo">{{titulo}}</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="registro in popular" v-bind:key="registro._id">
              <!--<td v-for="item in registro" v-bind:key="item">{{item}}</td>-->
              <td >{{registro.id}}</td>
              <td >{{registro.primeiroNome}}</td>
              <td >{{registro.segundoNome}}</td>
              <td >{{registro.porcento}}%</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
export default {
  name: 'listaTabela' ,
  props:['popular','cabecalhoTitulo','titulos'],
  data() {
    return {

    }
  }

}
</script>

<style lang="scss">
h3{
  color:black;
  text-align: center;
}
#cabecalho {
  width: 40%;
  margin: 50px 0px 0px 50px;
  float: left;
}
</style>
