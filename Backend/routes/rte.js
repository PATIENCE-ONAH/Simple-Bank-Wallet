const express = require('express')
const { register, login, dashboard, withdraw} = require('../controllers/customerctrols.js')
const { verifyAuth } = require('../middleware/auth.js')


const routManager = express.Router()

// routManager.get('/', (req,res)=>{
//     res.send("data")
//   })
routManager.post('/registerCustomer', register)

routManager.post('/Auth', login)

routManager.post('/dashboard', verifyAuth, dashboard)
routManager.post('/withdraw', verifyAuth, withdraw)


// app.get('/', (req, res)=>{
//     res.send('rehdjdjjk')
// })

module.exports = {routManager}