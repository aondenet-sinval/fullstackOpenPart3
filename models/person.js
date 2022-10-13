const mongoose = require('mongoose')

//Conexão local:
  const url = 'mongodb://localhost:27017/phonebook'
//Conexão MongoDB Atlas:
// const url = process.env.MONGODB_URI


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

//Id generateId
// const generateId = () => {
//   const id = Math.floor(Math.random() * 40)
//   return id
// }
//
// const person = new Person({
//   name: 'Albert Von',
//   number: '11-3030-222'
// })
// const phonebook = new Person({
//   name: nameBook,
//   number: numberBook,
//   id: generateId()
// })
//
// person.save().then(result => {
//   console.log(`add ${person.name} number ${person.number} to phonebook!`)
//   mongoose.connection.close()
// })
// //Search persons
// Person.find({}).then(result => {
//   result.forEach(persons => {
//   console.log(persons.name, persons.number, persons.id)
//   })
//   mongoose.connection.close()
// })
module.exports = mongoose.model('Person', personSchema)
