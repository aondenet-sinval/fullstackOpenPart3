const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
    app.use(cors())
    app.use(express.static('build'))
    app.use(express.json())
    app.get('/', (request, response)=>{
      response.send('<h1>Hello world</h1>')
    })
    app.get('/api/persons', (request, response)=>{
      Person.find({}).then(persons => {
        response.json(persons)
      })
    })
    app.get('/info', (request, response)=>{
      Person.find({}).then(persons => {
        response.send(`Phonebook has info for ${persons.length} person. <br /> ${Date()}.`)
      })

    })
    app.get('/api/persons/:id', (request, response, next) => {
      Person.findById(request.params.id)
        .then(person =>{
          if (person) {
            response.json(person)
          }else {
            response.status(404).end()
          }
        })
        .catch(error => next(error))
    })
    //error:
    const errorHandler = (error, request, response, next ) => {
      // console.error(error.message)
      if(error.name === 'CastError') {
        return response.status(400).send ({ error: 'malformatted id' })
      }
      next(error)
    }
    app.use(errorHandler)
    morgan.token('valueName', function(req, res) {
      return '{"name": "' + req.body.name + '" "number": "'
                + req.body.number + '"}';
    });
    app.use(morgan(':method :url :status :res[content-length] :response-time ms :valueName'))
    //post
    app.post('/api/persons', (request, response, next) => {
      const body = request.body

        //Verificando se o campo name foi preenchido
        if (!body.name) {
          return response.status(400).json({
            error: 'faltou name'
          })
        }

        const person = new Person({
          name: body.name,
          number: body.number,
        })
        person.save().then(result => {
          console.log(`add ${person.name} number ${person.number} to phonebook!`)
        })
        response.json(person)
})
    //put
  app.put('/api/persons/:id', (request, response) =>{
    const body = request.body
    const  person = {
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
      })
      .catch(error => next(error))
})
  // app.use(errorHandler)
    //delete
    app.delete('/api/persons/:id', (request, response, next) => {
      Person.findByIdAndRemove(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => next(error))
    })

app.use(errorHandler)
const PORT = process.env.PORT || 3001

    app.listen(PORT,()=>{
      console.log(`Server express running on port: ${PORT}.`);
    })
