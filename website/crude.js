const express = require('express')
const app = express()
const port = 5000
const people = require('./routes/people')
const auth = require('./routes/auth')


app.use(express.static('./navbar-app'))
// parse a formdata
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api/people', people)
app.use('/login',auth)

app.all('*',(req, res)=>{
    res.status(404).send('PAGE NOT FOUND')
})
app.listen(port,()=>{
    console.log(`the server is listening at port: ${port}`)
})