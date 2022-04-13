//connect server to mongodb

const mongoose =  require('mongoose')

//define connection to string

mongoose.connect('mongodb://localhost:27017/bankApp',{
    useNewUrlParser:true
})

//to create the model
const User = mongoose.model('User',{
    accountno:Number,
    uname:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export model
module.exports = {
    User
}