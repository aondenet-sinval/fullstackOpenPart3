const express = require('express')
const app = express()
// const morgan = require('morgan')
const cors = require('cors')


let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]
    app.use(cors())
    app.use(express.static('build'))
    app.get('/', (request, response)=>{
      response.send('<h1>Hello world</h1>')
    })
    app.get('/api/persons', (request, response)=>{
      response.json(persons)
    })
    app.get('/info', (request, response)=>{
      const total = persons.length
      response.send(`Phonebook has info for ${total} person. <br /> ${Date()}.`)
    })
    app.get('/api/persons/:id', (request, response) => {
      const  id = Number(request.params.id)
      const person = persons.find(person => person.id === id)
      if (person) {
        response.json(person)
      }else {
        response.status(404).end()
      }

      console.log(person);
    })
    //post
    const generateId = () => {
      const id = Math.floor(Math.random() * 40)
      return id
    }
    app.use(express.json())
    // morgan.token('valueName', function(req, res) {
    //   return '{"name": "' + req.body.name + '" "number": "'
    //             + req.body.number + '"}';
    // });
    // app.use(morgan(':method :url :status :res[content-length] :response-time ms :valueName'))
    app.post('/api/persons', (request, response) => {
      const body = request.body
      //Verificando se o campo name foi preenchido
      if (!body.name) {
        return response.status(400).json({
          error: 'faltou name'
        })
      }
      //Verificando se o usuário já existe
      const namePerson = persons.find(p => p.name === body.name)
      if (namePerson) {
        return response.status(400).json({
          error: 'name já cadastrado'
        })
      }
      const person ={
        name: body.name,
        number: body.number,
        id: generateId()
      }
      persons = persons.concat(person)
      // console.log('body ', person);
      response.json(person)
    })
    //delete
    app.delete('/api/persons/:id', (request, response) => {
      const  id = Number(request.params.id)
      persons = persons.filter(person => person.id !== id)
      response.status(204).end()
    })

const PORT = 3001
const id = generateId()
    app.listen(PORT,()=>{
      console.log(`Server express running on port: ${PORT}.`);
    })
