const express = require('express')
const routes = require('./routes')
const db = require('./db')
require('dotenv').config()

const PORT = process.env.PORT || 4000

const app = express()

app.use('/',routes)

app.listen(PORT, () =>{
    console.log(`Server has been started on PORT: ${PORT}`)
})

db.startDB()

  

 

