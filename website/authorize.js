const authorize =(req, res, next)=>{
    const { user }= req.query
    if(user === 'john'){  //TOKEN
        req.user = {name:'john', id:3} //TOKEN, ACESS KEY
        next()
    }else{
        res.status(401).send('UNAUTHORIZED')
    }
}

module.exports = authorize