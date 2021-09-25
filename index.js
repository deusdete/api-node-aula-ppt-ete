const express = require('express')
const { v4: uuid } = require('uuid')

const server = express()

server.use(express.json())

// Métodos HTTP
/*
    GET: Obtem dados
    POST: Cria dados
    PUT: Altera dados
    DELETE: Apaga dados
*/

/* Informações para o Aluno
  aluno: 
    nome, 
    email,
    senha,
    cpf, 
    data_nascimento,  
    n_sus, 
    telefone, 
    endereco, 
    responsavel, 
    turma
*/

const alunos = []

//GET => http://localhost:3000/alunos

// GET / => Retorna todos os aulos
server.get('/alunos', (request, response) => {
  return response.send(alunos)
})

server.post('/alunos', (request, response) => {
  const dados = request.body

  alunos.push({
    id: uuid(),
    ...dados,
  })

  return response.json({ mensagem: 'Aluno cadastrado com sucesso!' })
})

server.put('/alunos/:id', (request, response) => {
  const id_aluno = request.params.id
  const dados = request.body

  const alunoIndex = alunos.findIndex((aluno) => {
    return aluno.id === id_aluno
  })

  if (alunoIndex === -1) {
    return response.send({ mensagem: 'Aluno não encontrado' })
  }

  alunos[alunoIndex] = {
    id: id_aluno,
    ...dados,
  }

  return response.status(200).send({ mensagem: 'Aluno atualizado com sucesso' })
})

server.delete('/alunos/:id', (request, response) => {
  const id_aluno = request.params.id

  const alunoIndex = alunos.findIndex((aluno) => {
    return aluno.id === id_aluno
  })

  if (alunoIndex === -1) {
    return response.send({ mensagem: 'Aluno não encontrado' })
  }

  alunos.splice(alunoIndex, 1)

  return response.json({ mensagem: 'Aluno apagado com sucesso!' })
})

server.listen(3000, () => {
  console.log('Server rodando na porta 3000 🚀')
})
