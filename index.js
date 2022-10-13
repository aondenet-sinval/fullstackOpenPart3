const express = require('express')
const app = express()
// const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
    app.use(cors())
    app.use(express.static('build'))
    app.get('/', (request, response)=>{
      response.send('<h1>Hello world</h1>')
    })
    app.get('/api/persons', (request, response)=>{
      Person.find({}).then(persons => {
        response.json(persons)
      })

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

      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person.save().then(result => {
        console.log(`add ${person.name} number ${person.number} to phonebook!`)
      })
      // persons = persons.concat(person)
      // console.log('body ', person);
      response.json(person)
    })
    //delete
    app.delete('/api/persons/:id', (request, response) => {
      const  id = Number(request.params.id)
      persons = persons.filter(person => person.id !== id)
      response.status(204).end()
    })

const PORT = process.env.PORT || 3001
// const id = generateId()
    app.listen(PORT,()=>{
      console.log(`Server express running on port: ${PORT}.`);
    })
