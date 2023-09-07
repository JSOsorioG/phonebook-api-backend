const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')


//require('dotenv').config()

require('./mongo')

const Person = require('./models/Person')



app.use(cors())
app.use(express.json())

app.use(logger)

/*const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(persons))
})*/

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<h1>Phonebook has info for ${persons.length} people</h1>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params
    //const person = persons.find(person => person.id === id)
    Person.findById(id).then(person => {
      if (person) {
        response.json(person)
      }
      else {
          response.status(404).end()
      }
    })   
})

app.delete('/api/persons/:id', (request, response, next) => {
    const { id } = request.params
    //persons = persons.filter(person => person.id !== id)
    Person.findByIdAndRemove(id).then(result => {
      response.status(204).end()
    }).catch(err => {
      next(err)
    })    
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  const name = person.name

if ((!person.name) || (!person.number) ) {
  return response.status(400).json({
    error: 'Name and number can´t be empty'
  })
  //console.log('Campo en blanco');
}
else if(Person.find(name)){
  //console.log('Nombre repetido');
  return response.status(400).json({
    error: 'Name must be unique'
  })

}
else {
  //console.log('Correcto');
  //const ids = persons.map(person => person.id)
  //const maxId = Math.max(...ids)

  const newPerson = new Person({
    name: person.name,
    number: person.number
  })

  /*const newPerson = {
    id: maxId +1,
    name: person.name,
    number: person.number
  }*/

  //persons = [...persons, newPerson]
  newPerson.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })

  
}
  
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  const { id } = request.params

    const updatedPerson = {
    ...persons.find((person) => person.id === id),
    //name: person.name,
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

app.use((request, response, next) => {
  response.status(400).end()
})

app.use((error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    response.status(404).json({
      error: "id used is malformed"
    })
  } else {
    response.status(500).end()
  }
})



const PORT = process.env.PORT || 3001
//const PORT = 6385
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
