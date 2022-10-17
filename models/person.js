const mongoose = require('mongoose')

//Conexão local:
  // const url = 'mongodb://localhost:27017/phonebook'
//Conexão MongoDB Atlas:
const url = process.env.MONGODB_URI


mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
personSchema.set('toJSON', {
  transform: (document, returnedObject ) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)


module.exports = mongoose.model('Person', personSchema)
