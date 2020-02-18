import { http } from './config.js'

export default {
  listar:(page = 1)=>{
    return http.get(`pessoas?page=${page}`)
  },
  salvar:(pessoa)=>{
    return http.post('pessoa',pessoa)
  },
  atualizar:(pessoa) => {
    return http.put(`pessoa/${pessoa.id}`,pessoa)
  },
  deletar:(idPessoa) => {
    return http.delete(`pessoa/${idPessoa}`)
  }

}
