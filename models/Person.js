//! Import required modules

const mongoose = require('mongoose') //Import Mongoose

//! Set Mongoose structure

//? Create Mongoose's schema
const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
  })
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//? Create Mongoose's model 
const Person = mongoose.model('Person', personSchema)

//? Export Mongoose model
module.exports = Person