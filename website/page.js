const express = require('express')
const app = express()
const port = 3000
const { products } = require('./data');


app.get('/', (req, res) => {
    res.send('<h1>Home page</h1> <a href="/api/products">Products</a>');
});

app.get('/api/products', (req, res) => {
    const newProduct = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image };
    });
    res.json(newProduct);
});

app.get('/api/products/:ProductID', (req, res) => {
    const {ProductID} = req.params; 
    const singleProduct = products.find((product)=>product.id === Number(ProductID))
    if(!singleProduct){
        return res.status(404).send("Product doesn't exist")
    }
    res.json(singleProduct)
})

app.get('/api/v1/query', (req,res)=>{
    const { search, limit} = req.query
    let sortedProducts = [...products]

    if(search){
        sortedProducts= sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }

    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if( sortedProducts.length < 1){
        // res.status(200).send('no product found')
        return res.status(200).json({sucess: true, data: []})
    }
    return res.status(200).json(sortedProducts)
})
app.all('*' , (req, res)=>{
    res.status(404).send('Page Not Found')
})

app.listen(port,()=>{
    console.log(`the server is listening at port: ${port}`)
})