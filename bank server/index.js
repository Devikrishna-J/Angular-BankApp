//import express
const express = require('express')
const dataService = require('./services/data.services')
const jwt = require('jsonwebtoken')
const cors = require('cors')
//create app using express
const app = express()

//to use cors origin
app.use(cors({
        origin:'http://localhost:4200'
}))

//to parse json
app.use(express.json())

//application specific middleware
const logMiddleware = (req,res,next)=>{
    console.log("LogMiddleware");
    next()
}
//app.use(logMiddleware)



//bank server
//Middleware - to authenticate valid users once logged in
const jwtMiddleware = (req,res,next)=>{
    try{
        //const token = req.body.token   //token given in the body part of request
        const token = req.headers["x-access-token"] //token given in the headers part of request
        console.log(jwt.verify(token,'supersecretkey123'));
        const data =  jwt.verify(token,'supersecretkey123')
        req.currentAcc = data.currentAcc
        next()
    }
    catch{
            res.status(422).json({
                statusCode:422,
                status:false,
                message: "Please Login!!!"
            })            
    }
}

//register server - db
app.post('/register',(req,res)=>{
        //asynchronous
        dataService.register(req.body.acno,req.body.uname,req.body.password)
        .then(result=>{
        res.status(result.statusCode).json(result)
    })    
})
//login server - db
app.post('/login',(req,res)=>{
    dataService.login(req.body.acno,req.body.password)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})
//deposit API
app.post('/deposit',jwtMiddleware,(req,res)=>{
    dataService.deposit(req.body.acno,req.body.pswd,req.body.amnt)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })    
})

//withdraw API
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    dataService.withdraw(req,req.body.acno,req.body.pswd,req.body.amnt)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })      
})

//transaction API
app.post('/transaction',jwtMiddleware,(req,res)=>{
    dataService.getTransaction(req,req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)  
    })         
   
})
//delete Account
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)  
    })         
   
})

//set port for server
app.listen(3000,()=>{
    console.log("server started at port no: 3000");
})



/* ****************************example-resolve http request*******************************

//GET- fetch data
app.get('/',(req,res)=>{
    res.send("GET METHOD")
});
//POST- create data
app.post('/',(req,res)=>{
    res.send("POST METHOD")
});
//PUT- to modify/update completetly data
app.put('/',(req,res)=>{
    res.send("PUT METHOD")
});
//PATCH- to modify/update partially data
app.patch('/',(req,res)=>{
    res.send("PATCH METHOD")
});
//DELETE- to delete data
app.delete('/',(req,res)=>{
    res.send("DELETE METHOD")
});
************************************************************************************ */

/* functions used before connecting server to Mongo datbase
//register API
app.post('/register',(req,res)=>{
    const result = dataService.register(req.body.acno,req.body.uname,req.body.password)
    res.status(result.statusCode).json(result)
})

//login API
app.get('/login',(req,res)=>{
    const result = dataService.login(req.body.acno,req.body.password)
    res.status(result.statusCode).json(result)
})

//deposit API
app.post('/deposit',jwtMiddleware,(req,res)=>{
    const result = dataService.deposit(req.body.acno,req.body.password,req.body.amnt)
    res.status(result.statusCode).json(result)
})

//withdraw API
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    const result = dataService.withdraw(req,req.body.acno,req.body.password,req.body.amnt)
    res.status(result.statusCode).json(result)
        
   
})
//transaction API
app.post('/transaction',jwtMiddleware,(req,res)=>{
    const result = dataService.getTransaction(req,req.body.acno)
    res.status(result.statusCode).json(result)        
   
})          
*/
