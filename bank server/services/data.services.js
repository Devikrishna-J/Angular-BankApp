//import jsonwebtoken
const jwt = require('jsonwebtoken')
//import db.js
const db = require('./db')
database ={
    1000:{accountno:1000,uname:"Ram",password:"1000",balance:35000,transaction:[]},
    1001:{accountno:1001,uname:"Raj",password:"1001",balance:5000,transaction:[]},
    1002:{accountno:1002,uname:"Ravi",password:"1002",balance:3000,transaction:[]},
  }
  //register definition
//server to mongodb
  const register = (acno,uname,password)=>{
    return db.User.findOne({accountno:acno})
    .then(user=>{
      if(user){
        console.log(user);
        return {
          statusCode:422,
          status:false,
          message: "Account number already exist"
          
        }        
      }
      else{
        const newUser = new db.User({
          accountno:acno,
          uname,
          password,
          balance:0,
          transaction:[]
        })
        newUser.save()
        return {
          statusCode:200,
          status:true,
          message: "Register Successfully"        
        }
      }
    })   
  }


  
//login defenition
const login = (acno,password)=>{
  return db.User.findOne({
    accountno:acno,
    password
  })
  .then(user=>{
    
      if(user){
      currentUser= user.uname
      currentAcno=acno
      token = jwt.sign({      //token generation
        currentAcc: acno
      },'supersecretkey123')
       
      return {
            statusCode:200,
            status:true,
            message: "Login Successfully",
            currentUser,
            currentAcno,
            token
      }
    
      }
      else{
        return {
          statusCode:422,
          status:false,
          message: "Invalid credentials"          
        }
      }
  })
}



//dashboard component- deposit
const deposit = (acno,pswd,amnt)=>{ 
  //console.log(acno,pswd)  
  return db.User.findOne({
    accountno:acno,
    password:pswd
  })
  .then(user=>{
    
    if(user){
        var amount = parseInt(amnt)
        user.balance+=amount
        user.transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        user.save()
        return{
          statusCode: 200,
          status: true,
          message:"Account credited successfully...Available balance is  "+user.balance
        } 
    }
    else{
      return{
        statusCode: 422,
        status: false,
        message:"Invalid Credentials"
      }
    }
  })
}
 


//withdraw defenition
const withdraw = (req,acno,pswd,amnt)=>{
  var amount = parseInt(amnt);
  currentAcc =req.currentAcc

  return db.User.findOne({accountno:acno,password:pswd})
  .then(user=>{
    if(currentAcc!=acno){
      return{
        statusCode: 422,
        status: false,
        message:"Operation Denied!!!"
      } 
    }
    if(user){
      if(user.balance>amount){
        user.balance-=amount
        user.transaction.push({
          amount:amount,
          type:"DEBIT"
        })
        user.save()
        return{
          statusCode: 200,
          status: true,
          message:"Account debited successfully...Available balance is  "+user.balance
        } 
      }
      else{
        return{
          statusCode: 422,
          status: false,
          message:"Insufficient Balance in your Account  "+user.balance
         } 
      }

      } 
      else{
        return{
          statusCode: 422,
          status: false,
          message:"Invalid Credentials"
        }
      }
  })  
}

//transaction history definition
const getTransaction = (req,acno)=>{
    currentAcc =req.currentAcc
    return db.User.findOne({accountno:acno})
    .then(user=>{
      if(currentAcc!=acno){
        return{
          statusCode: 422,
          status: false,
          message:"Operation Denied!!!"
        } 
      }
      if(user){
        return{
          statusCode:200,
          status:true,
          transaction:user.transaction
        }
      }
      else{
        return{
          statusCode: 422,
          status: false,
          message:"Invalid Credentials"
        }
      }
    })    
}
const deleteAcc = (acno)=>{
  return db.User.deleteOne({
    accountno:acno
  })
  .then(user=>{
    if(user){
      return{
          statusCode:200,
          status:true,
          message:"Account deleted successfully"
      } 
    }
    else{
      return{
        statusCode: 422,
        status: false,
        message:"Invalid Credentials"
      }
    }
  }  
  )
}


//export defined functions -to access functions in  other files
module.exports= {
   register,
   login,
   deposit,
   withdraw,
   getTransaction,
   deleteAcc
}


/*
/* code used before server -db connections
//register defenition

const register = (acno,uname,password)=>{
    let db=database;
    if(acno in db){
      return {
        statusCode:422,
        status:false,
        message: "Account number already exist"
        
  }
    }
    else{
      db[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      
      return {
        statusCode:200,
        status:true,
        message: "Register Successfully"        
  }
    }
}

//login definition

const login = (acno,password)=>{
    
  let db=database;
  if(acno in db){
    if(password == db[acno]["password"]){
      currentUser=db[acno]["uname"]
      currentAcno=acno
      token = jwt.sign({      //token generation
        currentAcc: acno
      },'supersecretkey123')
       
      return {
            statusCode:200,
            status:true,
            message: "Login Successfully",
            currentUser,
            currentAcno,
            token
      }
    }
    else{
        //alert("Invalid password")
        return {
          statusCode:422,
          status:false,
          message: "Invalid password",
          currentUser,
          currentAcno,
          token
    }
    }
  }
  else{
      //alert("Account number not exist");
      return {
        statusCode:422,
        status:false,
        message: "Account number not exist",
        currentUser,
        currentAcno,
        token
  }
  }
}

//dashboard component- deposit
const deposit = (acno,pswd,amnt)=>{
  var amount = parseInt(amnt)
  let db =database;
  if(acno in db){
    if(pswd == db[acno]["password"]){
      db[acno]["balance"]+=amount;
      db[acno].transaction.push({
        amount:amount,
        type:"CREDIT"
      })
     // this.saveDetails();
      
      return{
        statusCode: 200,
        status: true,
        message:"Account credited successfully...Available balance is  "+db[acno]["balance"]
      } 
    }
    else{     
        return{
          statusCode: 422,
          status: false,
          message:"Enter your registered Password"
        }
    }

  }
  else{
    //alert("Account number not exist")
    return{
      statusCode: 422,
      status: false,
      message:"Account number not exist"
    }
  }
}


//withdraw defenition
const withdraw = (req,acno,pswd,amnt)=>{
  var amount = parseInt(amnt);
  currentAcc =req.currentAcc
  let db =database;
  if(acno in db){
    if(pswd == db[acno]["password"]){
          if(currentAcc!=acno){
            return{
              statusCode: 422,
              status: false,
              message:"Operation Denied!!!"
            } 
          }
        if(db[acno]["balance"]>amount){
          db[acno]["balance"]-=amount;
          db[acno].transaction.push({
            amount:amount,
            type:"DEBIT"
          })
         // console.log(db);
          
         // this.saveDetails();
          return{
                statusCode: 200,
                status: true,
                message:"Account debited successfully...Available balance is  "+db[acno]["balance"]
          } 
        }
        else{
          //alert("Insufficient Balance in your Account")
          return{
            statusCode: 422,
            status: false,
            message:"Insufficient Balance in your Account  "+db[acno]["balance"]
      } 
        }        
    }
    else{
      //alert("Enter your registered Password")
      return{
        statusCode: 422,
        status: false,
        message:"Enter your registered Password"
    }

    }

  }
  else{
    return{
      statusCode: 422,
      status: false,
      message:"Invalid Account Number"
  }
  }
}

//transaction history definition
const getTransaction = (req,acno)=>{
    currentAcc =req.currentAcc
    if(acno in database){
      if(currentAcc!=acno){
        return{
          statusCode: 422,
          status: false,
          message:"Operation Denied!!!"
        } 
      }
      return{
              statusCode:200,
              status:true,
              transaction:database[acno].transaction
      }
    }
    else{
      return{
        statusCode: 422,
        status: false,
        message:"Invalid Account Number"
      }
    }
} */






