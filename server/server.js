const express = require('express')
const cors = require('cors')
const routes = require('./route')

const dotenv = require('dotenv').config()
const app = express()

const port = process.env.PORT || 4000
console.log('port: ', port);

app.use(express.json())
app.use(cors())


app.use('/api', routes)

app.get('/ping', (req,res)=>{
    res.send("pong")
})

app.listen(port,()=>{
    console.log(`The server is running on ${port}`)
})  
