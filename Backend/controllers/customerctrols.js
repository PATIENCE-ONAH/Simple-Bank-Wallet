const sequelize = require("../config/connection.js")
const { Customer } = require("../models/customer.js")
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { deposit } = require("../models/savings.js")
const { withdrawal } = require("../models/withdrawal.js")
const saltRounds = bcrypt.genSaltSync(10)
const secret = "secret"



const register = async (req, res) => {
    
    const cus = {
        cusName: req.body.CustomerName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds)

    }
Customer.findAll({
    where: {
        username: req.body.username
    }
  }).then(rs =>{
    if(rs.length >= 1)
    {
        res.status(200).json([{message:"username taken"}])  
    }
    else
    {
        Customer.create(cus).then(rs=>{
            console.log(rs)
            res.status(200).json([{ message: "data created" }])
        }).catch(err=>{
            console.log(err)
            res.status(403).json([{ message: "err" }])
        })
    }
   
 

}).catch(err=>{
      console.log(err)
  });

}

const login = async(req,res)=>{
    const  username = req.body.username
    const  password = req.body.password
      Customer.findOne({
          where: {
              username: username
          }
        }).then(rs =>{
       if(rs)
       {
          const validity  =  bcrypt.compareSync(password,rs.dataValues.password)
          if(validity == true){
              const token = jsonwebtoken.sign(rs.dataValues,secret)
              res.status(200).json([{ message: token}])
          }else{
              res.status(200).json([{ message: "invalid" }]) 
          }
       }else{
          res.status(200).json([{ message: "invalid" }]) 
       }
  
      }).catch(err=>{
            console.log(err)
        });
  }
  
  
  
  const dashboard = async (req,res)=>{
   let total = 0
   let totalwith = 0
      const customerID = req.decoded.custid
   const result = await deposit.findAll({
          where: {
              custid: customerID
          }
      })
  result.map((r)=>{
        total = total +  r.dataValues.Amountdep
       })
       withdrawal.findAll({
              where: {
                  custid: customerID
              }
          }).then(rsw =>{
             rsw.map((rw)=>{
               return   totalwith = totalwith + rw.dataValues.withdrawalAmt
              })
              res.status(200).json([{customer:customerID,fullname:req.decoded.cusName,savings:total,withdraw:totalwith,balance:total - totalwith}])
  
              }).catch(err=>{
  console.log(err)
          })
      }

const withdraw = async (req,res)=>{
        let totalsavings = 0
        let totalwith = 0
          const  Amount = req.body.Amount
          const password = req.decoded.custid
        const output = await deposit.findAll({
               where: {
                custid: password
               }
           })
       output.map((r)=>{
             totalsavings = r.dataValues.Amountdep
            })
            withdrawal.findAll({
                   where: {
                       custid: password
                   }
               }).then(rsw =>{
                if(Amount <= totalsavings){
                  rsw.map((rw)=>{
                    return   totalwith = totalwith + Amount
                })
                   res.status(200).json([{Amtwithrawled:totalwith,savings:total,withdraw:totalwith,balance:total - totalwith}])
                }else {
                    res.status(200).json([{ message: "Insufficient funds" }])
                }
                   }).catch(err=>{
       console.log(err)
               })
         }
    
    //   const Transfer = async(req,res)=>{
    //     const  username = req.body.username
    //     const  Amount = req.body.transferAmt
    //     const password = req.body.password
    //   Customer.findall({
    //         where:{ 
    //             username: username
    //         }
        
    //     }).then(rs=>{
    //         if(rs.length >= 1 && Amount <= ){
    //             res.status(200).json([{message:"Userconfirmed"}])  
    //         }else{
    //             res.status(200).json([{message:"User not Found"}])
    //         }
        
    //     })
        
        
    // }


      module.exports = { register, login, dashboard, withdraw}









