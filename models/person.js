const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
//Conexão local:
  // const url = 'mongodb://localhost:27017/phonebook'
//Conexão MongoDB Atlas:
const url = process.env.MONGODB_URI


mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, unique: true },
  number: { type: String, minlength: 8 },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
  }
})
personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)
