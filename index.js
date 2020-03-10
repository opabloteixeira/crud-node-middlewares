const express = require('express');

const server = express();

server.use(express.json())


//middlewares
server.use((req, res, next) => {
    console.log(`LOG - Method: ${req.method} URL: ${req.url}`)

    return next()
})


function checkUserExists(req, res, next){

    if(!req.body.name){
        return res.status(400).json({error: 'user name is required'})
    }

    return next();
}
//console.time('Request')
//console.timeEnd('Request')

function checkUserInArray(req, res, next){
    const { index } = req.params
    const user = users[index]

    if(!user){
        return res.status(400).json({error: 'user does not exists'})
    }

    req.user = user;

    return next();
}





const users = ['Pablo', 'Maria', 'Daiane']




// Query params = ?teste=1
server.get('/teste', (req, res) =>{
    const name = req.query.name;

    return res.json({ message: ` Hello ${name}` })
});




//pega um usuario
// Route params = /users/1
server.get('/users/:index', checkUserInArray, (req, res) =>{
    //const = req.params.index;
    //const { id } = req.params; ou assim desestruturação
    return res.json(req.user)
});



// lista todos
server.get('/users', (req, res) =>{
    return res.json(users)
});


//criar um usuario
// Request body = { }
server.post('/users', checkUserExists, (req, res)=>{
    const { name } = req.body

    users.push(name)

    return res.json(users)
})



//Altera usuários 
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params
    const { name } = req.body

    users[index] = name

    return res.json(users)
})


//deleta usuario
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const {index} = req.params

    users.splice(index, 1)

    return res.json(users)
})




server.listen(3001); 