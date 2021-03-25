require('dotenv').config()

const express = require("express")
const cors = require("cors")
const PORT = 5000 || process.env.PORT
// const{ db }= require('./config/dbConfig')

// import db config
const db = require('./config/database')

// import routers
const booksRouter = require('./routes/books')
const userRouter = require('./routes/user')
const paymentRouter = require('./routes/payment')
const recordRouter = require('./routes/records')
const statisticRouter = require('./routes/statistics')

// app define
const app = express()

var isDbConnected = false
// app.use(async(req, res, next)=>{
 db.connect((err, success)=>{
        if (err) console.log(err.message);
        else{
            isDbConnected = true
            console.log("database connected..");
        }
    })
// })

app.use((req, res, next)=>{
    if (isDbConnected){
        return next()
    }
    else {
       const context ={
           error : true,
           message : "Database connection fail!"
       }
       return res.json(context)
    }
})

// mddleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.get('/', (req, res)=>{
    res.json({
        message : "Hello there! Welcome. Please login!"
    })
})

// books routes
app.use('/users', userRouter)
app.use('/books', booksRouter)
app.use('/payments', paymentRouter)
app.use('/records', recordRouter)
app.use('/statistics', statisticRouter)

// invalid route handler
app.use('/*', (req, res)=>{
    return res.status(404).json({
        error : true,
        message : "Invalid URL!"
    })
})


// listening server on a port 
// if (isDbConnected) 
app.listen(PORT, ()=>console.log(`Server running::${PORT}...`))