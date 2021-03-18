const express = require("express")
const cors = require("cors")
const PORT = 5000 || process.env.PORT

// import db config
// const db = require('./config/database')

// import routers
const booksRouter = require('./routes/books')
const userRouter = require('./routes/user')
const paymentRouter = require('./routes/payment')
const recordRouter = require('./routes/records')
const ststicRouter = require('./routes/statistics')

// app define
const app = express()

// mddleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.get('/', (req, res)=>{
    res.json({
        message : "Hello there! Welcome to Library management system. Please login!"
    })
})

// books routes
app.use('/users', userRouter)
app.use('/books', booksRouter)
app.use('/payments', paymentRouter)
app.use('/records', recordRouter)
// app.use('/books', booksRouter)
// app.use('/books', booksRouter)
// app.use('/books', booksRouter)

// invalid route handler
app.use('/*', (req, res)=>{
    return res.status(404).json({
        error : true,
        message : "Invalid URL!"
    })
})


// listening server on a port
app.listen(PORT, ()=>console.log(`Server running::${PORT}...`))