// getting-started.js
const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI

main().catch(err => console.log(err));

async function main() {
  console.log('Conectando')
  await mongoose.connect(connectionString)
    .then(result => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message)
    })

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

/*Person.find({}).then(result => {
  console.log(result)
  mongoose.connection.close()
})

const person = new Person({
  name: 'Sebas',
  number: '3137219437'
})

person.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })*/