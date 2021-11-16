require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")
const jobrouter = require("./routes/joblist")

const app = express()
port = process.env.PORT || 8000

app.use(express.json())
app.set('view engine', 'ejs')

mongoose.connect('mongodb+srv://hklohani:hklohani@cluster0.iat4x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use('/img', express.static(__dirname + '/front-main/images'))
app.use('/jobs', jobrouter)

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(port, ()=> console.log(`server is running on port ${port}`));