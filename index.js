const express = require ('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

// setup databases
const PORT = 3000;
const databases = "SIM_RS"
mongoose.connect(`mongodb://127.0.0.1/${databases}`)
.then((result)=>{
    console.log(`Connected to Mongodb(${databases})`)
}).catch((err)=>{
    console.log(err)
})


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'front-end'))


app.get('/index', (req,res)=>{
    res.render('pages/index')
})
app.listen(PORT,()=>{
    console.log(`Server is running on http://127.0.0.1:${PORT}`)
})