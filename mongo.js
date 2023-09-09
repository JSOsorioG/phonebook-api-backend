//! Import required modules

const mongoose = require('mongoose') //Import Mongoose

//? Define DB's constants
const connectionString = process.env.MONGODB_URI //Define connectionString using .env variable
//const connectionString = 'mongodb+srv://juansesochevi:123@cluster0.fnlykx0.mongodb.net/phonebook?retryWrites=true&w=majority' //Define connectionString directly

//! Connect to MongoDB

//? Mongoose's code to connect to DB
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