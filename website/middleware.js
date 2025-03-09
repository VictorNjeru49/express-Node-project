const express = require('express')
const app = express()
const port = 5000;
const logger = require('./logger')
const authorize = require('./authorize')
const morgan = require('morgan')

app.use(morgan('tiny'))
// app.use([authorize,logger])
app.get('/',(req,res)=>{
    res.status(200).send('Home page')
})
app.get('/about', (req,res)=>{
    res.status(200).send('About page')
})
app.all('*',(req, res)=>{
    res.status(404).send('PAGE NOT FOUND')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})