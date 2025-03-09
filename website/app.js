const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.static('./navbar-app'));

app.get('/', (req, res) => {
    // res.status(200).send('Hello World!');
    
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
})
app.get('/about', (req, res) => {
    res.status(200).send('About Us');
})

app.get('/genre', (req, res) => {
    res.status(200).send('Genre for all books');
})

app.get('/collections', (req, res) => {
    res.status(200).send('All collections Library');
})

app.get('/contact', (req, res) => {
    res.status(200).send('Contact Us');
})

app.get('/signin', (req, res) => {
    res.status(200).send('Login Here');
})

app.get('/signup', (req, res) => {
    res.status(200).send('Register Your Details');
})

app.get('/profile', (req, res) => {
    res.status(200).send('Users Details');
})

app.all('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})