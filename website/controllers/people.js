let { people } =require('../data')


const getPeople =(req,res)=>{
    res.status(200).json({sucess: true, data: people})
}

const createPerson =(req,res)=>{
    const { name } = req.body
    if(!name){
        return res.status(400).json({sucess:false, msg:'please provide a name'})
    }
    res.status(201).send({sucess: true, person: name})
}
const createPersonPostman =(req, res)=>{
    const {name} = req.body
    if (!name) {
     return res.status(400).json({success: false, msg: 'please provide name value'} )
    }
    res.status(201).send({ success: true, data: [...people ]})

}

const updatePerson =(req, res)=>{
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
}

const deletePerson =(req, res)=>{
    const person = people.find((person)=>person.id === Number(req.params.id))

    if(!person){
        return res.status(404).json({sucess:false, msg:`no person with id: ${req.params.id}`})
    }

    const newpeople = people.filter((person)=>person.id !==Number(req.params.id))
    res.status(200).send({success:true, data:newpeople})
}
module.exports ={
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}