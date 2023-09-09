//! Import required modules

const express = require('express') //Import Express Framework
const app = express()
const logger = require('./middleware/loggerMiddleware') //Import Logger Middleware
const cors = require('cors') //Import Cors in order to alloww access to APIs in another port or server
const notFound = require('./middleware/notFound.js') //Import notFound Middleware to manage not fount HTTP requests
const handleErrors = require('./middleware/handleErrors.js') //Import handleErrors Middleware to manage HTTP request errors
//require('dotenv').config() //Import dotenv dependency to manage .env file
require('./mongo') //Import mongo.js file to manage mongoDB connection
const Person = require('./models/Person') //Import Person.js file which includes Schema and Model to use with mongoDB

//! Setup Middlewares

app.use(cors())
app.use(express.json())
app.use(logger)

//? Get Middleware to show the API's name
app.get('/', (request, response) => {
    response.send('<h1>Welcome to Phonebook API</h1>')
})

//? Get Middleware to show API's info
app.get('/info', (request, response) => {
  response.send(`<h1>Phonebook has info of ${Person.length} people</h1>`)
})

//? Get Middleware to show all API's data
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

//? Get Middleware to show specific API's data
app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params
    Person.findById(id).then(person => {
      if (person) {
        response.json(person)
      }
      else {
          response.status(404).end()
      }
    })   
})

//? Delete Middleware to remove specific API's data
app.delete('/api/persons/:id', (request, response, next) => {
    const { id } = request.params
    Person.findByIdAndDelete(id).then(() => {
      response.status(204).end()
    }).catch(err => {
      next(err)
    })    
})

//? Post Middleware to save specific API's data
app.post('/api/persons', (request, response) => {
  const person = request.body
  const name = person.name
  if ((!person.name) || (!person.number) ) {
    return response.status(400).json({
      error: 'Name and number can´t be empty'
    })
  }
  /*else if(Person.find({name: name}).exec().then(response => console.log(response))){
    //console.log('Nombre repetido');
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }*/
  else {
    const newPerson = new Person({
      name: person.name,
      number: person.number
    })
    newPerson.save().then(savedPerson => {
      response.status(201).json(savedPerson)
    }) 
  } 
})

//? Put Middleware to update specifi API's data
app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  const { id } = request.params
  const updatedPerson = {
    number: person.number
  }
  Person.findByIdAndUpdate(id, updatedPerson, {new: true})
    .then(result => {
      response.json(result)
    })
    .catch(err => {
      next(err)
    }) 
})

app.use(notFound)
app.use(handleErrors)

//! Initiliaze API's server

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
