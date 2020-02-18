<template>
  <div id="cabecalho" class=" justify-content-center">
    <h3>{{cabecalhoTitulo}}</h3>
    <table style="width:100%" class="table table-striped table-bordered" aria-controls="my-table">
      <thead>
          <tr>
              <th> Id  </th>
              <th v-for="titulo in titulos" v-bind:key="titulo">{{titulo}}</th>
              <th>Editar</th>
              <th>Remover</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="registro in popular" v-bind:key="registro._id">
              <td >{{registro._id}}</td>
              <td >{{registro.primeiroNome}}</td>
              <td >{{registro.segundoNome}}</td>
              <td >{{registro.porcentagem}}%</td>
              <td>
                <button @click="onEdit(registro)" type="button" class="btn btn-outline-info">
                   <span class="glyphicon glyphicon-align-left" aria-hidden="true"> Editar</span>
                </button>
              </td>
              <td>
                <button  @click="onDelete(registro._id)" type="button" class="btn btn-outline-danger">Deletar</button>
              </td>
          </tr>
      </tbody>
    </table>
    <div id="pagination" class="">
      <b-pagination
            @input="paginas(currentPageT)"
            v-model="currentPageT"
            :total-rows="rowsT"
            :per-page="perPageT"
            aria-controls="my-table"
          ></b-pagination>
    </div>
  </div>
</template>



<script>

export default {
  name: 'listaTabela' ,
  props:['popular','cabecalhoTitulo','titulos','onDelete','onEdit','rowsT','perPageT','paginas'],
  data() {
    return {
      currentPageT:1
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
  //width: 40%;
  margin: 50px 0px 0px 50px;
  float: left;
}
</style>
