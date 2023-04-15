const express = require('express');
const { routManager } =require('./routes/rte.js')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const saltRounds = bcrypt.genSaltSync(10)
const bodyParser = require('body-parser')
const app = express()
const port = 5000;
const Cors = require('cors')
dotenv.config()

app.use(Cors())
console.log(process.env.DATABASE)
console.log(bcrypt.hashSync("password", saltRounds))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/', routManager)

// app.get('/',(req,res)=>{ 
 
//     res.send('Hello World');
//     })

app.listen(port,()=>{
    console.log('server running')
})