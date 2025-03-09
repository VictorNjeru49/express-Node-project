const express = require('express')
const app = express()
exports.app = app
const port = 5000
let { people } =require('./data')


app.use(express.static('./navbar-app'))
// parse a formdata
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//get all
app.get('/',(req,res)=>{
    res.status(200).send('<h1>Home page</h1> <a href="/api/people">Details</a>')
})
app.get('/api/people',(req,res)=>{
    res.status(200).json({sucess: true, data: people})
})
// to read after posting
app.post ('/api/people',(req,res)=>{
    const { name } = req.body
    if(!name){
        return res.status(400).json({sucess:false, msg:'please provide a name'})
    }
    res.status(201).send({sucess: true, person: name})
})

app.post('/login',(req,res)=>{
    const { name } = req.body
    if(name){
       return res.status(201).send(`welcome ${name}`)
    }
    res.status(401).send('Please provide credentials')
})

app.post('/api/postman/people', (req, res)=>{
    const {name} = req.body
    if (!name) {
     return res.status(400).json({success: false, msg: 'please provide name value'} )
    }
    res.status(201).send({ success: true, data: [...people ]})

    })

app.put('/api/people/:id',(req, res)=>{
 const { id }= req.params
 const { name } = req.body

 const person = people.find((pers)=>pers.id === Number(id))

 if(!person){
     return res.status(404).json({sucess:false, msg:`no person with id: ${id}`})
 }

 const newperson = people.map((person)=>{
    if(person.id === Number(id)){
        person.name =name
    }
    return person
 })
 res.status(200).send({success:true, data: newperson})
})

app.delete('/api/people/:id',(req, res)=>{
    const person = people.find((person)=>person.id === Number(req.params.id))

    if(!person){
        return res.status(404).json({sucess:false, msg:`no person with id: ${req.params.id}`})
    }

    const newpeople = people.filter((person)=>person.id !==Number(req.params.id))
    res.status(200).send({success:true, data:newpeople})
})
app.all('*',(req, res)=>{
    res.status(404).send('PAGE NOT FOUND')
})
app.listen(port,()=>{
    console.log(`the server is listening at port: ${port}`)
})