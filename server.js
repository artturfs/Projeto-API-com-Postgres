import { fastify } from 'fastify'
// import { DatabaseMemory } from './databaseMemory.js'
import { DatabasePostgress } from './databasePostgress.js'

const server = fastify()
const database = new DatabasePostgress()

// Request Body

server.post('/videos', async (request, reply) => { // Criando um novo video
    const { title, description, duration } = request.body
    
    await database.create({
        title,
        description,
        duration
    })

    console.log(database.list())

    return reply.status(201).send()
})
  
server.get('/videos', async (request, reply) => { // Lista todos os videos
    const search = request.query.search
    console.log(search)

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => { // Atualizar um video (Atualizando UM único video)
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => { // Deleta um video
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333
})

/* 
| Método  | Funcionalidade                                          |
|---------|----------------------------------------------------------|
| GET     | Buscar dados do servidor (ex: listar ou obter um item)  |
| POST    | Enviar dados para o servidor (ex: criar um novo item)   |
| PUT     | Substituir um recurso existente por completo            |
| DELETE  | Remover um recurso do servidor                          |
| PATCH   | Atualizar parcialmente um recurso existente             |
*/

// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/ID