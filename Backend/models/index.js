
const sequelize = require("../config/connection.js")
const { statement } = require("./accountstatement.js")
// const { Customer } = require("./customer.js")
// const { deposit } = require("./savings.js")
// const { withdrawal } = require("./withdrawal.js")



sequelize.sync().then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
